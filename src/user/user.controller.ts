import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  HttpCode,
  Redirect,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const Captcha = svgCaptcha.create({
      size: 4, // 字符数
      fontSize: 40, //文字大小
      width: 100, //宽度
      height: 40, //高度
      background: '#cc9966', //背景颜色
      noise: 3, // 干扰线条数
    });
    session.code = Captcha.text;
    console.log('获取验证码');
    res.type('image/svg+xml');
    res.send(Captcha.data);
    return {
      data: '验证码获取成功',
    };
  }

  @Post('login')
  creatUser(@Body() body, @Session() session) {
    if (
      /[a-zA-Z]/.test(body.code) &&
      body.code.toLocaleLowerCase() === session.code.toLocaleLowerCase()
    ) {
      console.log('验证码正确');
      return {
        data: '登录成功',
        msg: '登录成功',
      };
    } else {
      console.log('验证码错误', body.code, session.code);
      return {
        data: '',
        code: 400,
        msg: '登录失败',
      };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
