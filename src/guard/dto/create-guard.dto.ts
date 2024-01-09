import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  @ApiProperty({
    example: 'wsm',
  })
  name: string;
  @ApiProperty({
    example: 12,
  })
  age: number;
}
