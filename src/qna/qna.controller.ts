import { Body, Controller, Post } from '@nestjs/common';
import { AskDto } from './dto/ask.dto';
import { QnaService } from './qna.service';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}
  @Post()
  async askQnA(
    @Body() askDto: AskDto,
  ): Promise<{ question: string; answer: string }> {
    return await this.qnaService.askGemini(askDto.question);
  }
}
