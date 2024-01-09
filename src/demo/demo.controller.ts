import { Controller, Get } from '@nestjs/common';

@Controller('demo')
export class DemoController {
  @Get()
  getAll() {
    return {
      key: 'Hello World!',
    };
  }
}
