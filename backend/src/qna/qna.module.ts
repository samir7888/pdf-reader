import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { GeminiModule } from '../gemini/gemini.module';

import { PineconeModule } from '../pinecone/pinecone.module';
import { EmbeddingModule } from '../embedding/embedding.module';

@Module({
  controllers: [QnaController],
  providers: [QnaService],
  imports: [GeminiModule, PineconeModule, EmbeddingModule],
})
export class QnaModule {}
