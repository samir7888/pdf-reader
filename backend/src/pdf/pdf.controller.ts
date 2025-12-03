import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfservice: PdfService) {}
  @Get()
  healthCheck() {
    return { status: 'PDF Service is running' };
  }
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // <── your folder
        filename: (req, file, callback) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${unique}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    // manual validation
    const MAX = 100 * 1024 * 1024; // 100MB
    const isPdfMime = /pdf/i.test(file.mimetype || '');
    const isPdfExt = file.originalname?.toLowerCase().endsWith('.pdf');

    if (file.size > MAX || !(isPdfMime || isPdfExt)) {
      // remove file saved by multer
      try {
        unlinkSync((file as any).path ?? join('./uploads', file.filename));
        return {
          message:
            'Invalid file uploaded. Only PDF files under 1 byte are allowed.',
        };
      } catch (err) {
        console.error('Failed to delete file after invalid upload', err);
      }
    }
    const response = await this.pdfservice.processPdf(
      (file as any).path ?? join(file.filename),
    );
    return {
      message: 'File uploaded successfully',
      response,
    };
  }
}
