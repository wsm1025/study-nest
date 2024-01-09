import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly UserService: UserService,
    @Inject('DEMO_SERVICE') private readonly appService: AppService,
    @Inject('name') private readonly name: Array<string>,
    @Inject('demoName') private readonly dd: string,
    @Inject('DEMO_TOKEN') private readonly DEMO_TOKEN: string,
  ) {}

  @Get('/add')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/mu')
  getMu(): number {
    return this.appService.getAdd(); // 这里返回一个数字
  }
  @Get('/name')
  getName(): string[] {
    return this.name;
  }
  @Get()
  getDD(): string {
    return this.dd;
  }
  @Get('/user')
  getUser(): string {
    return this.DEMO_TOKEN;
  }
}
