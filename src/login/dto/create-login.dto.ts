import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
export class CreateLoginDto {
  @IsNotEmpty({
    message: 'name不能为空',
  })
  @IsString({
    message: 'name必须是字符串',
  })
  @Length(5, 10, {
    message: '不能超过10个字符',
  })
  name: string;

  @IsNotEmpty({
    message: 'age不能为空',
  })
  @IsNumber(
    {
      allowNaN: false,
    },
    {
      message: 'age必须是数字',
    },
  )
  age: number;
}
