import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { PineconeModule } from 'src/pinecone/pinecone.module';
import { GeminiModule } from 'src/gemini/gemini.module';

@Module({
  imports: [EmbeddingModule, PineconeModule, GeminiModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
