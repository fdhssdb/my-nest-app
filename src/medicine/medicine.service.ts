import { Injectable, Res } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { Repository, Like } from 'typeorm';
import * as fs from 'node:fs';
import { join } from 'path';
import path from 'node:path';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine) private readonly medicine: Repository<Medicine>,
  ) {}

  create(pic, createMedicineDto: CreateMedicineDto) {
    console.log('新增');
    const data = new Medicine();
    data.name = createMedicineDto.name;
    data.desc = createMedicineDto.desc;
    data.pic = pic.filename;
    return this.medicine.save(data);
  }

  async findAll(query: { per: number; page: number; keywords: string }) {
    console.log('查找所有药品信息');

    const list = await this.medicine.find({
      where: {
        name: Like(`%${query.keywords}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.per,
      take: query.per,
    });
    const total = await this.medicine.count({
      where: {
        name: Like(`%${query.keywords}%`),
      },
    });
    return {
      data: {
        list,
        total,
      },
    };
  }

  update(id: number, updateMedicineDto: UpdateMedicineDto, pic?: any) {
    console.log('修改成功', {
      ...updateMedicineDto,
    });
    return this.medicine.update(
      id,
      pic
        ? {
            pic: pic.filename,
            ...updateMedicineDto,
          }
        : updateMedicineDto,
    );
  }

  async remove(id: number) {
    const record = await this.medicine.find({
      where: {
        id: id,
      },
    });
    const pathname = join(__dirname, '../images', record[0].pic);
    console.log(pathname);
    fs.unlink(pathname, (err) => {
      if (err) throw err;
      console.log('文件已被删除');
    });
    return this.medicine.delete(id);
  }
}
