

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

enum orderstatus{

  PENDING='Pending',
   PROCESSING='Processing',
  DELIVERED= 'Delivered',
   CANSELED='cancelled'

}

@Schema()
export class Cart {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;


@Prop()

@Prop({enum:orderstatus,default:orderstatus.PENDING})
 status:orderstatus;

  @Prop()
  id:string;
  
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);