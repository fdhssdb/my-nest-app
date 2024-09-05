import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('列表接口') //api分组
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pic'))
  create(
    @Body() createListDto: CreateListDto,
    @UploadedFile() pic: Express.Multer.File,
  ) {
    return this.listService.create(createListDto, pic);
  }

  @Get()
  findAll(@Query() query: { per: number; page: number; keywords: string }) {
    return this.listService.findAll(query);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('pic'))
  update(
    @Param('id') id: number,
    @Body() updateListDto: UpdateListDto,
    @UploadedFile() pic: Express.Multer.File,
  ) {
    return this.listService.update(+id, updateListDto, pic);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.listService.remove(+id);
  }
}
