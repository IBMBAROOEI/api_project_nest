 import { IsNotEmpty, IsString, IsNumber, IsOptional, IsN } from 'class-validator';

export class CreateCartdetailDto {


    @IsOptional()
    @IsNotEmpty()
    @IsNumber({}, { message: 'لطفاً عدد را وارد کنید' })
    readonly quantity: number;
  
  
    @IsOptional()
    readonly total: number;

}
