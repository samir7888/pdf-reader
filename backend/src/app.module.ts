import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfModule } from './pdf/pdf.module';
import { QnaModule } from './qna/qna.module';
import { EmbeddingModule } from './embedding/embedding.module';
import { ConfigModule } from '@nestjs/config';
import { PineconeModule } from './pinecone/pinecone.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    PdfModule,
    QnaModule,
    EmbeddingModule,
    ConfigModule.forRoot(),
    PineconeModule,
    YoutubeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
