 import { IsNotEmpty, IsString, IsNumber, IsOptional, isNumber } from 'class-validator';

export class CreateCartdetailDto {


    @IsOptional()
    @IsNotEmpty()
    @IsNumber({}, { message: 'لطفاً عدد را وارد کنید' })
    readonly quantity: number;
  

    @IsNotEmpty()
    @IsString()
    readonly cartId:string;
  
    @IsOptional()
    readonly total: number;

}
