import { Controller, Post, Body, Delete,HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schemas';
import { Product } from 'src/product/schemas/product.schema';
import { OrderModule } from './order.module';

@Controller('api/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}




   @Get(':id')



async showOrderUser(@Param('id')id:string):Promise<any>{

 return await this.orderService.showOrderUser(id);
}



  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    


    const finalprice=await this.orderService.createorder(createOrderDto);

    return finalprice;
  }


  @Get()

  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderService.getAllOrder();

      return orders.map(order => ({
        ...order.toJSON(),
        user:{id:order.user.id},
        products: order.products.map(product => ({
          name: product.name,
          price: product.price
        }))
      }));
    } catch (error) {
      console.log(error);
    }
 
  }




  @Delete('/:id/:productId')
 async deleteproduct(
  @Param('id') id:string,
  @Param('productId')productId:string,):Promise<void>{


    try{

      await this.orderService.deleteproduct(id,productId)
    }catch(error){

      console.log("ok")
    }


 }


  
}