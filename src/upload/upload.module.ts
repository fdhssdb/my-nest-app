import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { extname, join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //__dirname： D:\MyProjects\my-nest-app\dist\upload
        destination: join(__dirname, '../images'),
        filename: (_, file, callback) => {
          //使用path.extname(path)获取路径中的最后一部分(文件拓展名)

          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
