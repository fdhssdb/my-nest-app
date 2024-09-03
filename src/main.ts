// 应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType, ValidationPipe } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { RoleGuard } from './guard/role/role.guard';

// const whiteList = ['/list', '/user'];

// function middleWareAll(req: Request, res: Response, next: NextFunction) {
//   console.log(req.originalUrl, '收全局的');

//   if (
//     whiteList.includes(req.originalUrl)
//   ) {
//     console.log('白名单路径');
//     next();
//   } else {
//     res.send('消息');
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  // __dirname: D:\MyProjects\my-nest-app\dist
  // 访问静态资源文件目录:http://localhost:3000/static/文件名
  app.useStaticAssets(join(__dirname, '../public'), {
    prefix: '/static',
  });
  // app.use(middleWareAll);
  app.use(
    session({
      secret: 'Xiaoman',
      rolling: true,
      name: 'xiaoman.sid',
      cookie: { maxAge: null },
    }),
  );
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new Response());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RoleGuard());
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('接口文档')
    .setDescription('描述')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
