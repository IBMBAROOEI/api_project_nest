import { Module } from '@nestjs/common';
import { ImageController } from './Imagecontroller';






@Module({
  controllers: [ImageController],
})
export class Imagemodule {}
