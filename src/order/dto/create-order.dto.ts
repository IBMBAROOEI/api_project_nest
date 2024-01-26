import { ArrayNotEmpty, IsArray, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";

class ProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  // @IsNumber()
 
  quantity: number;

  finalPrice: number;

  status: string;

  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  @ArrayNotEmpty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })

  products: ProductDto[];


}
