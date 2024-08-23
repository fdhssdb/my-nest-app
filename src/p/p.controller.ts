import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
// ValidationPipe
// ParseIntPipe
// ParseFloatPipe
// ParseBoolPipe
// ParseArrayPipe
// ParseUUIDPipe
// ParseEnumPipe
// DefaultValuePipe
import * as uuid from 'uuid';
import { PService } from './p.service';
import { CreatePDto } from './dto/create-p.dto';
import { UpdatePDto } from './dto/update-p.dto';

// console.log(uuid.v4())

@Controller('p')
export class PController {
  constructor(private readonly pService: PService) {}

  @Post()
  create(@Body() createPDto: CreatePDto) {
    return this.pService.create(createPDto);
  }

  @Get()
  findAll() {
    return this.pService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    console.log(typeof id, '============>');
    return this.pService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePDto: UpdatePDto) {
    return this.pService.update(+id, updatePDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pService.remove(+id);
  }
}
