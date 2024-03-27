import { Controller, Get, Post, Body, Patch, Param, Delete, Res, 
  HttpStatus, UnprocessableEntityException, UseGuards,Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Response } from 'express';
import { User } from '../user/schemas/user.schemas';
import { Product } from './schemas/product.schema';


@Controller('api/p')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Post()

  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

   @Get()
   async findAll():Promise<Product[]> {
    
 return await this.productService.findAll();
  

   }

  //  @Get(':id')
  //  async findOne(@Param('id') id: string,@Res() res:Response) {


  //  const data= await  this.productService.findOne(id);

  //  return res.status (HttpStatus.OK).json({data});
  //  }

   @Patch(':id')
    async update(@Param('id') id: string,@Body()updateProductDto: UpdateProductDto) {

     return await this.productService.update(id, updateProductDto);


   }

//





@Delete(':productId/:imageId')
async deleteImage (
@Param('productId')productId:string,
@Param('imageId')imageId:string,

):Promise<void>{
  return await this.productService.deletImage(productId,imageId)
}






@Delete(':id') 
 async remove(@Param('id') id: string,@Res() res:Response) {
   await this.productService.remove(id);

  return res.status (HttpStatus.NO_CONTENT).json();

}



}
