import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { EmbeddingModule } from '../embedding/embedding.module';
import { PineconeModule } from '../pinecone/pinecone.module';
import { GeminiModule } from '../gemini/gemini.module';

@Module({
  imports: [EmbeddingModule, PineconeModule, GeminiModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
