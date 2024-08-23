import { Module, Global, Inject, DynamicModule } from '@nestjs/common';
import { options } from 'svg-captcha';
interface options {
  path: string;
}
@Global()
@Module({
  providers: [{ provide: 'Configure', useValue: { baseUrl: '/api' } }],
  exports: [{ provide: 'Configure', useValue: { baseUrl: '/api' } }],
})
//动态模块（传参）
export class ConfigureModule {
  static forRoot(options: options): DynamicModule {
    return {
      module: ConfigureModule,
      providers: [
        { provide: 'Configure', useValue: { baseUrl: '/api' + options.path } },
      ],
      exports: [
        { provide: 'Configure', useValue: { baseUrl: '/api' + options.path } },
      ],
    };
  }
}
