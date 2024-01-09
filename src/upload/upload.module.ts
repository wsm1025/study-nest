import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
@Module({
  imports: [
    MulterModule.register({
      // 解释下
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename: (req, file, cb) => {
          // 生成唯一的文件名
          const filename = `${Date.now()}-${file.originalname}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
