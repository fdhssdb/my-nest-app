import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicine]), //使用forFeature()方法来定义在当前作用域内注册了哪些存储库
    MulterModule.register({
      storage: diskStorage({
        //__dirname： D:\MyProjects\my-nest-app\dist\upload
        destination: join(__dirname, '../../public'),
        filename: (_, file, callback) => {
          //使用path.extname(path)获取路径中的最后一部分(文件拓展名)
          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
