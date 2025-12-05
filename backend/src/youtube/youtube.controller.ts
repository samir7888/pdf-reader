import { Body, Controller, Post } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { PineconeService } from 'src/pinecone/pinecone.service';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { YoutubeDto } from './dto/YoutubeDto';

@Controller('youtube')
export class YoutubeController {
  constructor(
    private youtubeService: YoutubeService,
    private embeddingService: EmbeddingService,
    private pineconeService: PineconeService,
  ) {}
  @Post()
  async processVideo(@Body() { url }: YoutubeDto) {
    const fullText = await this.youtubeService.extractText(url);
    const videoId = this.youtubeService.extractId(url);
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await textSplitter.splitText(fullText);

    const embeddings = await this.embeddingService.embedChunks(chunks);

    await this.pineconeService.upsertEmbeddings(
      chunks,
      embeddings,
      `yt_${videoId}`,
      'youtube',
    );

    return {
      message: 'YouTube processed',
    };
  }
}
