import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!1';
  }
  getAdd(): number {
    return Math.random();
  }
}
