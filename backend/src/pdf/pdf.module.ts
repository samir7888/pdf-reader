import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { EmbeddingModule } from 'backend/src/embedding/embedding.module';
import { PineconeModule } from 'backend/src/pinecone/pinecone.module';
import { GeminiModule } from 'backend/src/gemini/gemini.module';

@Module({
  imports: [EmbeddingModule, PineconeModule, GeminiModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
