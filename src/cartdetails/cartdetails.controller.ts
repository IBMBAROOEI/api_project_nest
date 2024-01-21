import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartdetailsService } from './cartdetails.service';
import { CreateCartdetailDto } from './dto/create-cartdetail.dto';
import { UpdateCartdetailDto } from './dto/update-cartdetail.dto';

@Controller('cartdetails')
export class CartdetailsController {
  constructor(private readonly cartdetailsService: CartdetailsService) {}

  @Post()
  create(@Body() createCartdetailDto: CreateCartdetailDto) {
    return this.cartdetailsService.create(createCartdetailDto);
  }

  @Get()
  findAll() {
    return this.cartdetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartdetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartdetailDto: UpdateCartdetailDto) {
    return this.cartdetailsService.update(+id, updateCartdetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartdetailsService.remove(+id);
  }
}
