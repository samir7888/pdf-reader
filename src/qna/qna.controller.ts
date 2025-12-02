import { Controller, Post } from '@nestjs/common';

@Controller('qna')
export class QnaController {
  @Post()
  uploadQnA() {
    return 'QnA uploaded successfully';
  }
}
