


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/user.schemas';
import { Product } from '../../product/schemas/product.schema';


@Schema()
export class Order {
  toJSON(): any {
    throw new Error('Method not implemented.');
  }
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  // product:Product[];
 products: Product[];

  @Prop()
  quantity: number;

  @Prop()
  finalprice: number;

  @Prop({ default: 'Pending' })
  status: string;

  @Prop({ default: Date.now })
  dateOrdered: Date;


}

export const OrderSchema = SchemaFactory.createForClass(Order);