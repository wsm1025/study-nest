import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService2 {
  getHello(): string {
    return 'Hello World!1222';
  }
  getAdd(): number {
    return Math.random();
  }
}