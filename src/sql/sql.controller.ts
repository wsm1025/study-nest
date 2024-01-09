import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SqlService } from './sql.service';
import { CreateSqlDto } from './dto/create-sql.dto';
import { UpdateSqlDto } from './dto/update-sql.dto';

@Controller('sql')
export class SqlController {
  constructor(private readonly sqlService: SqlService) {}

  @Post()
  create(@Body() createSqlDto: CreateSqlDto) {
    return this.sqlService.create(createSqlDto);
  }

  @Get()
  findAll() {
    return this.sqlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sqlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSqlDto: UpdateSqlDto) {
    return this.sqlService.update(+id, updateSqlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sqlService.remove(+id);
  }
}
