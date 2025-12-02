import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

@Injectable()
export class EmbeddingService {
  private embeddings = new GoogleGenerativeAIEmbeddings({
    model: 'text-embedding-004', // Gemini embeddings model
    apiKey: process.env.GEMINI_API_KEY,
  });

  async embedChunks(chunks: string[]) {
    const vectors = await this.embeddings.embedDocuments(chunks);

    // vectors is an array of number[] (each is a 768 or 1024-dimension embedding)
    return vectors;
  }

  async embedQuery(query: string) {
    return await this.embeddings.embedQuery(query);
  }
}
