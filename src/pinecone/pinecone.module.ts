import { Module } from '@nestjs/common';
import { PineconeService } from './pinecone.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PineconeService],
  exports: [PineconeService],
})
export class PineconeModule {}
