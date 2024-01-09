import { DynamicModule, Global, Module } from '@nestjs/common';
import { DemoService } from './demo.service';
@Global() // 全局注册
@Module({
  // providers: [
  //   DemoService,
  //   {
  //     provide: 'DEMO_TOKEN',
  //     useValue: [1],
  //   },
  // ],
  // exports: [
  //   {
  //     provide: 'DEMO_TOKEN',
  //     useValue: [2],
  //   },
  // ],
  // 原因是在 Nest.js 中，
  // useValue 提供的是一个常量值，而常量值是不可变的。
  // 因此，如果你在 providers 数组中提供了一个名为 DEMO_TOKEN 的服务，
  // 并将其值设置为 '1'，那么即使你在 exports 数组中再次提供一个名为
  // DEMO_TOKEN 的服务，并将其值设置为 '2015'，其他模块仍然会获取到值为 '1' 的 DEMO_TOKEN。
})
export class DemoModule {
  // 静态方法
  static forRoot(options: any): DynamicModule {
    return {
      module: DemoModule,
      providers: [
        DemoService,
        {
          provide: 'DEMO_TOKEN',
          useValue: Math.random() + options.path,
        },
      ],
      exports: [
        {
          provide: 'DEMO_TOKEN',
          useValue: Math.random() + options.path,
        },
      ],
    };
  }
}
