import { Module } from '@nestjs/common';
import { SqlService } from './sql.service';
import { SqlController } from './sql.controller';
import { Sql } from './entities/sql.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Sql])],
  controllers: [SqlController],
  providers: [SqlService],
})
export class SqlModule {}
