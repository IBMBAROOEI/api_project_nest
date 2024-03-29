import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  [x: string]: any;
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop({ type: [{ imageUrl: String }] })
 images:{
   [x: string]: any; imageUrl:string
}[];
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);

// الان شما باید کانکشن مانگوز رو بسازی و از کالکشن استفاده کنی