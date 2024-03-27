
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';



 export class ImageDto{
  @IsString()
  imageUrl:string;
  
 }

export class CreateProductDto {

  readonly id: string;

  @IsString({ message: 'نام باید حروف باشد' })
  readonly name: string;

  @IsNumber({},{ message: 'قیمت را وارد کن' })
  readonly price: number;

  @IsNumber({},{ message: 'تعداد را وارد کن' })
  readonly quantity: number;

  @IsArray()
  @ValidateNested({each:true})
  @Type(()=>ImageDto)
   images:ImageDto[]

  

}
