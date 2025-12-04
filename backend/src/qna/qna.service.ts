import { Injectable } from '@nestjs/common';
import { EmbeddingService } from '../embedding/embedding.service';
import { GeminiService } from '../gemini/gemini.service';
import { PineconeService } from '../pinecone/pinecone.service';

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
Give answer in the language of the question that user gives.
for example, if user gives question in Hindi, answer in Hindi.
if nepali, answer in nepali.
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
