
import { IsEmail,IsString ,IsNotEmpty, MinLength, MaxLength, Matches} from "class-validator";

export class CreateUserDto {

    refreshToken: string;

    @IsEmail({},{message:'فرمت ایمیل معتبر نیست'})

    @IsString({message:"نام باید حروف باشد"})
    @IsNotEmpty({message:"نباید خالی باشه"})
                    readonly email:string;

                    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{6,}$/,
                    { message: 'رمز عبور باید شامل حروف بزرگ، حروف کوچک، اعداد و نمادهای ویژه باشد' })


                    @IsString({ message: 'رمز عبور باید رشته باشد' })
                    @IsNotEmpty({ message: ' پسورد نباید خالی باشد  '  })
                    @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر داشته باشد' })
                    @MaxLength(20, { message: 'رمز عبور باید حداکثر 20 کاراکتر داشته باشد' })
          
           readonly password:string;

          
          
          
}








