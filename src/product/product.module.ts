import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller'; 
import { Product,ProductSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema, Image } from '../imageupload/schemas/image.schema'; // آدرس مدل عکس را در اینجا وارد کنید
import { Configerror } from '../Erorrhandel/reponse.service';





@Module({
  controllers: [ProductController],

  providers: [ProductService,Configerror],
  imports:[MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
 { name: Image.name, schema: ImageSchema },

  ]),]
})
export class ProductModule {}
