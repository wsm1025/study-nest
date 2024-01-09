import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/ablum')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file);
    return {
      message: '文件上传成功',
      filename: file.filename,
    };
  }
  @Get('/export')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, '../images/1704555893815-IMG_4966.jpeg');
    res.download(url);
  }
  @Get('strem')
  async downLoad1(@Res() res: Response) {
    const url = join(__dirname, '../images/1704555893815-IMG_4966.jpeg');
    const tarSteam = new zip.Stream();
    await tarSteam.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-strem');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=1704555893815-IMG_4966.jpeg',
    );
    tarSteam.pipe(res);
  }
}
