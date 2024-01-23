import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
  import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import {Imagemodule } from './imageupload/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,  '../upload'), // مسیر فایل‌های استاتیک
    }),
    Imagemodule,UserModule,ProductModule,MongooseModule.
    forRoot('mongodb://127.0.0.1:27017/blog'), 


],
  
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
