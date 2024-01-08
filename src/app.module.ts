import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
  import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule,ProductModule,MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog'), 


],
  
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
