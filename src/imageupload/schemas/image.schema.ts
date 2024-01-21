
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Image {

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product' })
  // productId: MongooseSchema.Types.ObjectId;

  @Prop()
  imageUrl: string;
}

export type ImageDocument = Image & Document;
export const ImageSchema = SchemaFactory.createForClass(Image);