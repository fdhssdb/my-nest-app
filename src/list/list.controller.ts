import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
@ApiTags('列表接口') //api分组
@Controller('list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    @Inject('Configure') private readonly base: any,
  ) {}

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  findAll() {
    return { data: this.base, msg: '测试' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
