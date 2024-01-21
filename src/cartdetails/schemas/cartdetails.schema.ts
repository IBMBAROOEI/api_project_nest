

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';



@Schema()
export class CartDetails {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'cart' })
  cartId: MongooseSchema.Types.ObjectId;


  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'product' })
  productId: MongooseSchema.Types.ObjectId;



  @Prop()
  id:string;
  
}

export type CartDetailsDocument = CartDetails & Document;
export const CartDetailsSchema = SchemaFactory.createForClass(CartDetails);