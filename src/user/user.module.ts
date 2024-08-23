import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from 'src/middleware/index';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(Logger).forRoutes(UserController);
  // }
}
