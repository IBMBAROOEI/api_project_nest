import { Controller, Get, Post, Body, Patch, Param, Delete, Res, 
  HttpStatus, UnprocessableEntityException, UseGuards,Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Response } from 'express';
import { User } from 'src/user/schemas/user.schemas';


@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


 

  @Post()
 async create(@Res() res:Response, @Body() createProductDto: CreateProductDto): Promise<Response<any, Record<string, any>>> {
  
     try{
 

    const productdata=  await this.productService.create(createProductDto);
   return res.status (HttpStatus.CREATED).json({productdata});

     }catch(e){
      return res.status (HttpStatus.INTERNAL_SERVER_ERROR).
      json({error:e.message()
      });


     }
  }

   @Get()
   async findAll(@Res() res:Response) {
    
   const data=  await this.productService.findAll();
  
   return res.status (HttpStatus.OK).json({data});

   }

   @Get(':id')
   async findOne(@Param('id') id: string,@Res() res:Response) {


   const data= await  this.productService.findOne(id);

   return res.status (HttpStatus.OK).json({data});
   }

   @Patch(':id')
    async update(@Param('id') id: string,@Res() res:Response, @Body() 
   updateProductDto: UpdateProductDto) {

    const  data= await this.productService.update(id, updateProductDto);

    return res.status (HttpStatus.OK).json({data});

   }

//


@Delete(':id') 
 async remove(@Param('id') id: string,@Res() res:Response) {
   await this.productService.remove(id);

  return res.status (HttpStatus.NO_CONTENT).json();

}



}
