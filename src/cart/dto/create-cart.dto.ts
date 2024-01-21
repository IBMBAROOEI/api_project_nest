import { IsNumber, IsOptional, IsString, IsNotEmpty, ValidateNested } from "class-validator";

export class ProductDto{

   @IsString({ message: 'مقدار productId باید یک رشته باشد' })
   @IsNotEmpty({ message: 'مقدار productId نمی‌تواند خالی باشد' })
   readonly productId:string;
}


export class CreateCartDto {

   @ValidateNested({each:true})
   readonly products:ProductDto[];

  @IsString({ message: 'مقدار userId باید یک رشته باشد' })
  @IsNotEmpty({ message: 'مقدار userId نمی‌تواند خالی باشد' })
  readonly userId: string;

  @IsString({ message: 'مقدار productId باید یک رشته باشد' })
  @IsNotEmpty({ message: 'مقدار productId نمی‌تواند خالی باشد' })
  readonly productId: string;

//   @IsNotEmpty({ message: 'مقدار status نمی‌تواند خالی باشد' })
  readonly status: orderstatus;

  @IsOptional()
  @IsNumber({}, { message: 'لطفاً عدد را وارد کنید' })
  readonly quantity: number;

//   @IsNotEmpty({ message: 'مقدار id نمی‌تواند خالی باشد' })
  readonly id: string;

  @IsOptional()
  readonly total: number;
}




enum orderstatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  DELIVERED = 'Delivered',
  CANSELED = 'cancelled'
}