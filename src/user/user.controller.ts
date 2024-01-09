import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Query,
  Headers,
  HttpCode,
  Req,
  Res,
  Session,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    // @Get()
    // // findAll(@Request() req) {
    // //   console.log(req.query);
    // //   return {
    // //     code: 200,
    // //     ...req.query,
    // //   };
    // // }
    // findAll(@Query() query) {
    //   console.log(query);
    //   return {
    //     code: 200,
    //     ...query,
    //   };
    // }
    // @Post()
    // create(@Body('name') body) {
    //   console.log(body);
    //   return {
    //     code: 200,
    //     ...body,
    //   };
    // }
    // @Get(':id')
    // @HttpCode(201)
    // findId(@Param() params, @Headers() Headers) {
    //   console.log(params);
    //   return {
    //     code: 200,
    //     ...params,
    //     info: Headers,
    //   };
    // }
    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //   return this.userService.create(createUserDto);
    // }
    // @Get()
    // @Version('1')
    // findAll() {
    //   return this.userService.findAll();
    // }
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.userService.findOne(+id);
    // }
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //   return this.userService.update(+id, updateUserDto);
    // }
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.userService.remove(+id);
    // }
  }
  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const code = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1il', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#cc9966', // 验证码图片背景颜色
      height: 34,
      width: 100,
    });
    session.code = code.text; // 保存验证码字符，用于验证
    res.type('image/svg+xml');
    res.send(code.data);
  }
  @Redirect(
    'http://taizonga.top:3333/api/public/getAllList?current=1&size=100000000',
  )
  @Post('create')
  creaUsert(@Request() req, @Body() Body, @Session() session) {
    console.log(req, session.code);
    return {
      code: 200,
    };
  }
}
