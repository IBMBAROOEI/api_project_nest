import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from '../order/schemas/order.schemas';
import { ProductSchema,Product } from '../product/schemas/product.schema';
import { UserSchema } from 'src/user/user.schemas';
import { Configerror } from '../Erorrhandel/reponse.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([{name:'User',schema:UserSchema}]),
    MongooseModule.forFeature([{name:'Product',schema:ProductSchema}])
  ],
  controllers: [OrderController],
  providers: [Configerror,OrderService],
})
export class OrderModule {
  static findById: any;
}