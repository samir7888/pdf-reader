import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PineconeService {
  private pinecone: Pinecone;
  // private indexName = 'pdf';

  // 👈 Inject ConfigService in the constructor
  constructor(private configService: ConfigService) {
    // 👈 Access the variable via ConfigService
    const apiKey = this.configService.get<string>('PINECONE_API_KEY');

    if (!apiKey) {
      throw new Error(
        'PINECONE_API_KEY is not defined in environment variables.',
      );
    }

    this.pinecone = new Pinecone({
      // Ensure the key name here matches what's in your .env file
      apiKey: apiKey,
      // You may also need the environment/baseUrl depending on your Pinecone SDK version
      // environment: this.configService.get<string>('PINECONE_ENVIRONMENT'),
    });
  }

  async upsertEmbeddings(
    chunks: string[],
    vectors: number[][],
    sourceId: string,
    type: 'pdf' | 'youtube',
  ) {
    const index = this.pinecone.Index(type === 'pdf' ? 'pdf' : 'youtube');

    // Prepare vectors in Pinecone format
    const records = chunks.map((text, i) => ({
      id: `${sourceId}_chunk_${i}`,
      values: vectors[i], // embedding vector (now a number[] for each chunk)
      metadata: { text, type, sourceId }, // store original chunk
    }));

    // Upload to Pinecone
    await index.upsert(records);

    return {
      uploaded: records.length,
    };
  }

  async search(queryVector: number[], topK = 5, indexName: string) {
    const index = this.pinecone.Index(indexName);

    const result = await index.query({
      vector: queryVector,
      topK,
      includeMetadata: true,
    });

    return result.matches
      .filter((m) => m.metadata)
      .map((m) => m.metadata!.text);
  }
}
