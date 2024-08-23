import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import { Role, ReqUrl } from './role/role.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam, //用于描述动态参数
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@Controller('guard')
@ApiBearerAuth()
@ApiTags('守卫接口') //api分组
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @SetMetadata('role', ['admin'])
  //使用自定义装饰器
  // @Role('admin', 'test')
  @ApiOperation({ summary: 'get接口', description: '描述XXX' })
  @ApiQuery({ name: 'page', description: '分页信息' })
  findAll(@ReqUrl('123') url: string) {
    console.log(url, 'url');
    return this.guardService.findAll();
  }

  @Get(':id')
  // @Role('admin', 'test')
  @ApiParam({ name: 'id', description: '这是一个id', required: true })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
