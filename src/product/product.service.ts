import { Injectable } from '@nestjs/common';
import {CreateProductDto, ImageDto } from './dto/create-product.dto';
import {  Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

import { Image, ImageDocument, } from '../imageupload/schemas/image.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {
constructor(
  
  @InjectModel(Image.name)private readonly ImagetModel:Model<ImageDocument>,

  @InjectModel('Product')private readonly productModel:Model<Product>) { }



  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {

      const{name,price,quantity,images}=createProductDto;
       

      const imageUrls = images.map((image: ImageDto) => image.imageUrl);

      const newProduct = await this.productModel.create({
        name,
        price,
        quantity,
        images: imageUrls.map((imageUrl) => ({ imageUrl })),
      });
      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error('خطایی در ایجاد محصول رخ داده است.');
    }
  }

 

// async findAll():Promise<Product[]>{
  
     
//   return  await this.productModel.find().exec();
//   }
  
 
//   async findOne(id: string):Promise<Product>{ 
  
 
//    return  this.productModel.findById(id).exec();
  
//  }
 


async update(id:string,UpdateProductDto:UpdateProductDto):Promise<ProductDocument>{


  return this.productModel.findByIdAndUpdate(id,UpdateProductDto,{new:true})
}



async remove(id: string) {
return  this.productModel.findByIdAndDelete(id).exec();
  
}


  
}







