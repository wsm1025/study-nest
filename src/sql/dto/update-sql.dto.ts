import { PartialType } from '@nestjs/swagger';
import { CreateSqlDto } from './create-sql.dto';

export class UpdateSqlDto extends PartialType(CreateSqlDto) {}
