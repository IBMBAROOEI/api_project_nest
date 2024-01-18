// /import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose'
// // import{Product} from  '../../product/schemas/product.schema'

// export const ImageSchema= new mongoose.Schema ({
  
//   productid:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
//   imageUrl:{type:String},

// });

// export interface Image extends mongoose.Document{
//   productid:mongoose.Schema.Types.ObjectId,
//   imageurl:string


// }
// export const ImageModel = new mongoose.Model<Image>('Image', ImageSchema);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Image {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  productId: MongooseSchema.Types.ObjectId;

  @Prop()
  imageUrl: string;
}

export type ImageDocument = Image & Document;
export const ImageSchema = SchemaFactory.createForClass(Image);