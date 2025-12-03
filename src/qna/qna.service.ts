import { Injectable } from '@nestjs/common';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { GeminiService } from 'src/gemini/gemini.service';
import { PineconeService } from 'src/pinecone/pinecone.service';

@Injectable()
export class QnaService {
  constructor(
    private readonly embeddingservice: EmbeddingService,
    private pineconeService: PineconeService,
    private geminiService: GeminiService,
  ) {}
  async askGemini(question: string) {
    // Placeholder implementation
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
