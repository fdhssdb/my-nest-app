import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './entities/list.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import { Medicine } from 'src/medicine/entities/medicine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([List, Medicine]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../public'),
        filename: (_, file, callback) => {
          const filename = `${new Date().getTime() + extname(file.originalname)}`;
          return callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
