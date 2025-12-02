import { Injectable } from '@nestjs/common';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { PineconeService } from 'src/pinecone/pinecone.service';
import * as path from 'path';
import { GeminiService } from 'src/gemini/gemini.service';

@Injectable()
export class PdfService {
  constructor(
    private embeddingservice: EmbeddingService,
    private pineconeService: PineconeService,
    private geminiService: GeminiService,
  ) {}
  async processPdf(filePath: string) {
    // 1. Load PDF
    const loader = new PDFLoader(filePath, {
      splitPages: false, // We will chunk manually
    });

    const docs = await loader.load();
    const fullText = docs.map((d) => d.pageContent).join('\n');

    // 2. Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const chunks = await splitter.splitText(fullText);
    const embeddings = await this.embeddingservice.embedChunks(chunks);

    // create a unique id for this file (basename without extension + timestamp)
    const fileId = `${path.basename(filePath, path.extname(filePath))}-${Date.now()}`;

    await this.pineconeService.upsertEmbeddings(
      chunks,
      embeddings,
      fileId, // pass a unique id for each PDF
    );

    const question = 'Provide a brief summary of the document.';
    const queryVector = await this.embeddingservice.embedQuery(question);
    const results = await this.pineconeService.search(queryVector);
    const prompt = `
Use ONLY the following text to answer:

${results.join('\n\n')}

Question: ${question}
`;

    const answer = await this.geminiService.ask(prompt);

    return {
      question,
      answer,
    };
  }
}
