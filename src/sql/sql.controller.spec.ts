import { Test, TestingModule } from '@nestjs/testing';
import { SqlController } from './sql.controller';
import { SqlService } from './sql.service';

describe('SqlController', () => {
  let controller: SqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqlController],
      providers: [SqlService],
    }).compile();

    controller = module.get<SqlController>(SqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
