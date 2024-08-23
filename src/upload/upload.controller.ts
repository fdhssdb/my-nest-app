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
import type { Response } from 'express';
import { zip } from 'compressing';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file);
    return {
      data: '上传成功',
    };
  }

  @Get('export')
  download(@Res() res: Response) {
    const url = join(__dirname, '../images/1712413353296.jpg');
    res.download(url);
    return '下载成功';
  }

  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1712413353296.jpg');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);

    //将请求头设置位stream
    res.setHeader('Content-type', 'application/octet-stream');
    //Content-Disposition 响应标头指示回复的内容该以何种形式展示，是以内联的形式（即网页或者页面的一部分），还是以附件的形式下载并保存到本地。
    res.setHeader('Content-Disposition', 'attachment; filename=xiaoman.zip');

    //pipe作用：将输入数据转换为所需的形式
    tarStream.pipe(res);
    return '下载成功';
  }
}
