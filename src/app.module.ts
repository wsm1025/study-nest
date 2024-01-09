import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppService2 } from './app.service2';

import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { DemoController } from './demo/demo.controller';
import { Logger } from './logger/logger.middleware';
import { UploadModule } from './upload/upload.module';
import { PipeModule } from './pipe/pipe.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../sql.config';
import { SqlModule } from './sql/sql.module';
@Module({
  imports: [
    DemoModule.forRoot({
      path: '/add',
    }),
    UserModule,
    UploadModule,
    PipeModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    TypeOrmModule.forRoot({
      ...(config as any),
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 不推荐
      synchronize: true, // 生产环境请关闭
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 尝试重连数据库次数
      autoLoadEntities: true, // 自动加载实体
    }),
    SqlModule,
  ],
  controllers: [AppController, DemoController],
  // providers: [AppService],
  providers: [
    AppService2,
    {
      provide: 'DEMO_SERVICE',
      useClass: AppService,
    },
    // 自定义数据
    {
      provide: 'name',
      useValue: ['vue'],
    },
    // 工厂模式
    {
      provide: 'demoName',
      inject: [AppService2],
      async useFactory(AppService2: AppService2) {
        return await new Promise((res) => {
          // setTimeout(() => {
          res(AppService2.getHello());
          // }, 2000);
        });
      },
    },
  ],
})
export class AppModule implements NestModule {
  // 中间件
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Logger).forRoutes('*');
    // consumer.apply(Logger).forRoutes({
    //   path: '*',
    //   method: RequestMethod.POST,
    // });
    consumer.apply(Logger).forRoutes(AppController);
  }
}
