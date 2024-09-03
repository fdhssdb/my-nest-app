import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pic'))
  create(
    @Body() createMedicineDto: CreateMedicineDto,
    @UploadedFile() pic?: Express.Multer.File,
  ) {
    return this.medicineService.create(createMedicineDto, pic);
  }

  @Get()
  findAll(@Query() query: { per: number; page: number; keywords: string }) {
    return this.medicineService.findAll(query);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('pic'))
  update(
    @Param('id') id: number,
    @UploadedFile() pic: Express.Multer.File,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ) {
    console.log(id, pic);
    return this.medicineService.update(+id, updateMedicineDto, pic);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medicineService.remove(+id);
  }
}
