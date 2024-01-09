import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
  getDeno(): string {
    return 'Hello getDeno!1';
  }
}
