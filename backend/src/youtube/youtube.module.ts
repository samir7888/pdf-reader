import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeController } from './youtube.controller';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { PineconeModule } from 'src/pinecone/pinecone.module';

@Module({
  imports: [EmbeddingModule, PineconeModule],
  providers: [YoutubeService],
  controllers: [YoutubeController],
  exports: [YoutubeService],
})
export class YoutubeModule {}
