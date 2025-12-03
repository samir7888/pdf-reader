import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';
import { GeminiModule } from 'src/gemini/gemini.module';

import { PineconeModule } from 'src/pinecone/pinecone.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';

@Module({
  controllers: [QnaController],
  providers: [QnaService],
  imports: [GeminiModule, PineconeModule, EmbeddingModule],
})
export class QnaModule {}
