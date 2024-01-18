import { Injectable } from '@nestjs/common';
import {CreateProductDto } from './dto/create-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

import { Image, ImageDocument, } from '../imageupload/schemas/image.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {
constructor(
  
  @InjectModel(Image.name)private readonly ImagetModel:Model<ImageDocument>,

  @InjectModel(Product.name)private readonly productModel:Model<ProductDocument>) { }




  async create(createProductDto: CreateProductDto, imageUrl: string[]): Promise<any> {
    try {
      const newProduct = new this.productModel(createProductDto);
      const savedProduct = await newProduct.save();
  

      const imageProducts: Image[] = imageUrl.map((imageUrl: string) => ({
        productId: savedProduct._id,
        imageUrl: imageUrl,
      }));
  

      await this.ImagetModel.insertMany(imageProducts);
  

      const result = {
       savedProduct,
         imageProducts,
      };
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('خطایی در ایجاد محصول رخ داده است.');
    }
  }


 async findAll():Promise<Product[]>{
  
     
 return  await this.productModel.find().exec();
 }
 

 async findOne(id: string):Promise<Product>{ 
 

  return  this.productModel.findById(id).exec();
 
}
 


async update(id:string,UpdateProductDto:UpdateProductDto):Promise<ProductDocument>{


  return this.productModel.findByIdAndUpdate(id,UpdateProductDto,{new:true})
}



async remove(id: string) {
return  this.productModel.findByIdAndDelete(id).exec();
  
}


  
}







