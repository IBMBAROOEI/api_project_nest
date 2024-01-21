import { IsNumber, IsOptional, IsString, IsNotEmpty } from "class-validator";



export class CreateCartDto {


  @IsNotEmpty({ message: 'مقدار userId نمی‌تواند خالی باشد' })
  readonly userId: string;


//   @IsNotEmpty({ message: 'مقدار status نمی‌تواند خالی باشد' })
  readonly status: orderstatus;


//   @IsNotEmpty({ message: 'مقدار id نمی‌تواند خالی باشد' })
  readonly id: string;

 
}




enum orderstatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  DELIVERED = 'Delivered',
  CANSELED = 'cancelled'
}