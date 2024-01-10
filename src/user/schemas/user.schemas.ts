import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
 
  @Prop()
  email: string;
 
  // @Prop()
  // id: string;
 
  @Prop()
  refreshToken: string|null;

  @Prop()
  password:string;
  _id: string;
  // id: any;
  // static _id: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
