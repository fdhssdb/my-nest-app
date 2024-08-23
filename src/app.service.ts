//封装常用的业务逻辑、与数据层的交互（例如数据库）、其他额外的一些第三方请求
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
