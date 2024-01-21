import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from 'src/product/schemas/product.schema';
import { json } from 'stream/consumers';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()


  
  async create(@Body() createCartDto: CreateCartDto) {

   return this.cartService.create(createCartDto);
  
     
  }


@Get(':id')

async findPoduct (@Param('id') id:string, @Res() res ):
Promise<any>{
  
   const m= await this.cartService.findProduct(id);
    return m;
}

  



  // @Get()
  // findAll() {
  //   return this.cartService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
