import { Module } from '@nestjs/common';
import { GuardService } from './guard.service';
import { GuardController } from './guard.controller';

@Module({
  controllers: [GuardController],
  providers: [GuardService],
  imports: [],
})
export class GuardModule {}
