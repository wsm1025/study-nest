import { Injectable } from '@nestjs/common';
import { CreateSqlDto } from './dto/create-sql.dto';
import { UpdateSqlDto } from './dto/update-sql.dto';

@Injectable()
export class SqlService {
  create(createSqlDto: CreateSqlDto) {
    return 'This action adds a new sql';
  }

  findAll() {
    return `This action returns all sql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sql`;
  }

  update(id: number, updateSqlDto: UpdateSqlDto) {
    return `This action updates a #${id} sql`;
  }

  remove(id: number) {
    return `This action removes a #${id} sql`;
  }
}
