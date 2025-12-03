import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { GeminiModule } from 'backend/src/gemini/gemini.module';

import { PineconeModule } from 'backend/src/pinecone/pinecone.module';
import { EmbeddingModule } from 'backend/src/embedding/embedding.module';

@Module({
  controllers: [QnaController],
  providers: [QnaService],
  imports: [GeminiModule, PineconeModule, EmbeddingModule],
})
export class QnaModule {}
