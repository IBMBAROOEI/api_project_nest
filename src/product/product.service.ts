import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {CreateProductDto, ImageDto } from './dto/create-product.dto';
import {  Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';

import { Image, ImageDocument, } from '../imageupload/schemas/image.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateProductDto } from './dto/update-product.dto';
import { Configerror } from '../Erorrhandel/reponse.service';
import { error } from 'console';


@Injectable()
export class ProductService {
constructor(
  
  @InjectModel(Image.name)private readonly ImagetModel:Model<ImageDocument>,
  private readonly configerror:Configerror,

  @InjectModel('Product')private readonly productModel:Model<Product>) { }



  async create(createProductDto: CreateProductDto): Promise<any> {
    try {

      const{name,price,quantity,images}=createProductDto;

      const newProduct = await this.productModel.create({
        name,
        price,
        quantity,
        images: images.map((image: ImageDto) => ({
          
          imageUrl:image.imageUrl,

        })),
      });

      
      this.configerror.setSuccess(true);
      this.configerror.setMessage("محصول با موفقیت ثبت شد")

  this.configerror.setData(newProduct);

  return  this.configerror.getResponse();
 
    } catch (error) {
      this.configerror.setSuccess(false);
      this.configerror.addError('خطا درایجاد محصول');
      throw new HttpException(this.configerror.getResponse(),HttpStatus.
      
      INTERNAL_SERVER_ERROR)
      
    }
  }

 

async findAll():Promise<Product[]>{
  
    try{
     
const product= await this.productModel.find().exec();
   this.configerror.setSuccess(true);
  

this.configerror.setData(product);

return  this.configerror.getResponse();
    }
    catch(error){
      this.configerror.setSuccess(false);
      this.configerror.addError('خطا در نمایش محصول');
      throw new HttpException(this.configerror.getResponse(),HttpStatus.
      
      INTERNAL_SERVER_ERROR)

    }
  }
  
 
//   async findOne(id: string):Promise<Product>{ 
  
 
//    return  this.productModel.findById(id).exec();
  
//  }
 


async update(id:string,UpdateProductDto:UpdateProductDto):
Promise<any>{

console.log(UpdateProductDto);

  try{

    const {name,price,quantity,images}=UpdateProductDto;
     const product=await this.productModel.findById(id);
    if(!product){
      this.configerror.setSuccess(false);
    }
    product.name=name;
    product.price=price;
    product.quantity=quantity;
    if(images &&images.length>0){
      product.images=images.map((image:ImageDto)=>({

        imageUrl:image.imageUrl,
      }));
    }

    
    const updateProduct=await product.save();

      
    this.configerror.setSuccess(true);
    this.configerror.setMessage("محصول با موفقیت ثبت شد")

this.configerror.setData(updateProduct);

return  this.configerror.getResponse();

  }catch(error){
 console.log(error)

    this.configerror.setSuccess(false);
    // this.configerror.addError('خطا در ثبت محصول');
    throw new HttpException(this.configerror.getResponse(),HttpStatus.
    
    INTERNAL_SERVER_ERROR)

  }

  // return this.productModel.findByIdAndUpdate(id,UpdateProductDto,{new:true})
}



async remove(id: string) {
return  this.productModel.findByIdAndDelete(id).exec();
  


}




async deletImage(productId:string,imageId:string):Promise<any>{


  const product=await this.productModel.findById(productId);

  const imageIndex=product.images.findIndex((image)=>image
  
  ._id.toString()===imageId
  )

  if (imageIndex === -1) {
    throw new NotFoundException('تصویری با این شناسه در محصول یافت نشد');
  }

  product.images.splice(imageIndex,1);

  return await product.save();

}

  
}







