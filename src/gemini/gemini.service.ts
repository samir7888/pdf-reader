import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private model;

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    this.model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });
  }

  async ask(prompt: string) {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}
