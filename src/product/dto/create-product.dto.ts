
import { IsString ,IsNumber} from "class-validator";



export class CreateProductDto {

  readonly id: string;

  @IsString({ message: 'نام باید حروف باشد' })
  readonly name: string;

  @IsNumber({},{ message: 'قیمت را وارد کن' })
  readonly price: number;

  @IsNumber({},{ message: 'تعداد را وارد کن' })
  readonly quantity: number;

  

  readonly data: string[];
}
