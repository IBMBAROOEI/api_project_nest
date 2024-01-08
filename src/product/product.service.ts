import { Injectable } from '@nestjs/common';
import {CreateProductDto } from './dto/create-product.dto';
// import{Product} from './entities/product.entity';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {
constructor(@InjectModel(Product.name)private readonly productModel:Model<ProductDocument>) { }




async create(createProductDto: CreateProductDto): Promise<Product> {
  try {
    const newProduct = new this.productModel(createProductDto);
    const savedProduct = await newProduct.save();
    const collectionName = savedProduct.collection.name;
    console.log(collectionName); // نام کالکشن مورد استفاده در زمان درج داده

    return savedProduct;
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



 
//  async update(id:string, CreateProductDto:CreateProductDto): Promise<Product>{return
//  return  await this.productModel.findByIdAndUpdate(id, CreateProductDto).exec();
// }
// 

 
  
   

// }

// async update(id, CreateProductDto:CreateProductDto): Promise<Product>{return
  // await this.productModel.update(id, CreateProductDto
// }
   




