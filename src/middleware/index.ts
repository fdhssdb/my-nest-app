//自定义中间件

import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我来了嘿嘿嘿');
    res.send('我被拦截了');
    //next();
  }
}
