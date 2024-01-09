import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NextFunction, Request, Response } from 'express';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { globalResponse } from '../common/response';
import { HttpFilter } from '../common/filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { RoleGuard } from './guard/role/role.guard';
function midway(req: Request, res: Response, next: NextFunction) {
  // 全局中间件
  console.log(req.originalUrl);
  next();
}
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源访问路径
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images',
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cors());
  app.use(midway);
  app.use(
    session({
      secret: 'wsm918025',
      name: 'add.id',
      // rolling: true,
      cookie: {
        maxAge: 99999,
      },
    }),
  );
  app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new globalResponse());
  const validationOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
    validationError: {
      target: false,
      value: false,
    },
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map((error) => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return new HttpException(formattedErrors, HttpStatus.BAD_REQUEST);
    },
  };
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  // app.useGlobalGuards(new RoleGuard());

  // swagger 文档
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API文档')
    .setDescription('API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
