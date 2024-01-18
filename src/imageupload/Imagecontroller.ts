import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/upload')
export class ImageController {
  @Post()
  @UseInterceptors(
    FilesInterceptor('files[]', null, {
        
      storage: diskStorage({
        
        destination: './upload',
        filename: (req, file, cb) => {

          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const filenames = files.map(file => file.filename);
    return {
      data: filenames,
    };
  }
}