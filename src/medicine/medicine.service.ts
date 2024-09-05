import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { Repository, Like } from 'typeorm';
import * as fs from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine) private readonly medicine: Repository<Medicine>,
  ) {}

  create(createMedicineDto: CreateMedicineDto, pic?: Express.Multer.File) {
    console.log('新增', pic);
    const data = new Medicine();
    data.name = createMedicineDto.name;
    data.desc = createMedicineDto.desc;
    data.pic = pic ? pic.filename : '';

    return this.medicine.save(data);
  }

  async findAll(query: { per: number; page: number; keywords: string }) {
    console.log('查询药品信息', query.per, query.page, query.keywords);
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

  async getOptions() {
    console.log('查询所有药品种类');
    const options = await this.medicine.find({
      select: ['id', 'name'],
    });
    return {
      data: { options },
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

    if (record[0].pic) {
      const pathname = join(__dirname, '../../public', record[0].pic);
      fs.unlink(pathname, (err) => {
        if (err) throw err;
        console.log('文件已被删除');
      });
    }

    return this.medicine.delete(id);
  }
}
