import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res, UseGuards,Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import {JwtAuthGuard} from'src/jwt-auth.guard'
import { User } from './user.schemas';


@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly jwtService:JwtService,

    ) {}


  @Post('/register')
  //  async createUser ( @Res() res:Response,@Body() createUserDto: CreateUserDto) {
    
    
     createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }




  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
   
    const { sub: id, email } = req.user;
    return {
      id,
      email,
    };
  }
  }



//     const  {email, password}=createUserDto
  
//  const isDuplicate = await this.userService.checkemail({email});
//  if (isDuplicate) {


//   return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ایمیل تکراری است' }); }

      
//       const saltOrRounds = 10;
//       const hashedPassword = await bcrypt.hash(password, saltOrRounds);
//       const data = await this.userService.createUser(
//         email,
//         hashedPassword,
//       );

// ///      console.log(result. id: ObjectId,
//       //);
//       const payload = ({  id:data.id, email: data.email });

//       return {
//         data,
//         access_token:this.jwtService.sign(payload),
//       };

    



//     @Post("/login")
//      async loginuser (@Body() createUserDto: CreateUserDto,@Res() res:Response) {
      
      

//       const  {email, password}=createUserDto;

//         const data=await this.userService.findByEmail(email);
        
//         if(!data){


//           return res.status(HttpStatus.BAD_REQUEST).json({ message: 'ثبت نام نکردید'}); }

        
        
//         const checkpass=
//         await bcrypt.compare(password,data.password);
//         if(!checkpass){
        
//           return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'عدم دسترسی غیرمجاز' });
//         }

  
//         const payload = {  id:data.id, email: data.email };
  
  
//         const accessToken = this.jwtService.sign(payload);
    
//         return res.status(HttpStatus.OK).json({ data:data,
//           access_token:this.jwtService.sign(payload)});
//         };


    // }


  
  
  
  
  


  
  
  




  
  
  

