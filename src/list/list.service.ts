import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Like, Repository } from 'typeorm';
import { join } from 'node:path';
import fs from 'node:fs';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly list: Repository<List>,
  ) {}
  create(createListDto: CreateListDto, pic: Express.Multer.File) {
    console.log('新增', createListDto);
    const data = new List();
    // name,pic,price,amount,desc
    data.name = createListDto.name;
    data.pic = pic.filename ? pic.filename : '';
    data.price = createListDto.price;
    data.amount = createListDto.amount;
    data.desc = createListDto.desc;
    return this.list.save(data);
  }

  async findAll(query: { per: number; page: number; keywords: string }) {
    console.log('查找所有信息');
    const list = await this.list.find({
      where: {
        name: Like(`%${query.keywords}`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.per,
      take: query.per,
    });
    const total = await this.list.count({
      where: {
        name: Like(`%${query.keywords}`),
      },
    });
    return {
      data: {
        list,
        total,
      },
    };
  }

  async update(
    id: number,
    updateListDto: UpdateListDto,
    pic?: Express.Multer.File,
  ) {
    console.log('修改', { ...updateListDto });
    return this.list.update(
      id,
      pic ? { pic: pic.filename, ...updateListDto } : updateListDto,
    );
  }

  async remove(id: number) {
    const record = await this.list.find({
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
    return this.list.delete(id);
  }
}
