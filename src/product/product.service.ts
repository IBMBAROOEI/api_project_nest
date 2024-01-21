import { Injectable } from '@nestjs/common';
import {CreateProductDto } from './dto/create-product.dto';
import {  Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

// import { Image, ImageDocument, } from '../imageupload/schemas/image.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductService {
constructor(
  
  // @InjectModel(Image.name)private readonly ImagetModel:Model<ImageDocument>,

  @InjectModel('Product')private readonly productModel:Model<Product>) { }



  async createStudent(CreateProductDto: CreateProductDto): Promise<Product> {
    const newStudent = await new this.productModel(CreateProductDto);
    return newStudent.save();
 }

  // async create(createProductDto: CreateProductDto): Promise<Product> {
  //   try {

  //     //  const{name,price,quantity}=createProductDto;
       
  //     const newProduct = new this.productModel(createProductDto);

  //      return await newProduct.save();
  

  //     // const imageProducts: Image[] = imageUrl.map((imageUrl: string) => ({
  //     //   productId: savedProduct._id,
  //     //   imageUrl: imageUrl,
  //     // }));
  

  //     // await this.ImagetModel.insertMany(imageProducts);
  


  //     // const result = {
  //     //  savedProduct,
  //     //    imageProducts,
  //     // };
  //     // return savedProduct;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('خطایی در ایجاد محصول رخ داده است.');
  //   }
  // }

  // async create(createProductDto: CreateProductDto): Promise<Product> {
  //   const newProduct = new this.productModel(createProductDto);
  //   return newProduct.save();
  // }


//   async create(createProductDto: CreateProductDto): Promise<any> {



//  const newProduct =   new this.productModel(createProductDto);
//     return newProduct.save();


//   }


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







