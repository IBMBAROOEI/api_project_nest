
import { IsString ,IsNotEmpty} from "class-validator";

export class CreateProductDto {

    
    
readonly id:string;

@IsString({message:"نام باید حروف باشد"})
@IsNotEmpty({message:"نباید خالی باشه"})


 readonly name:string;

}

