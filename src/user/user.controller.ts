import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res, UseGuards,Request, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import {JwtAuthGuard} from'src/jwt-auth.guard'
import {RefreshTokenGuard} from'src/jwt-auth.guardResresh'

import { User } from './user.schemas';
import { RefreshTokenDto } from './dto/refresh-user.dto';


@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly jwtService:JwtService,
     

    ) {}


  @Post('register')
  
     createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }



  @Post('login')
  loginuser(@Body() data: CreateUserDto) {
    return this.userService.loginuser(data);
  }



  @Post('logout')
@UseGuards(JwtAuthGuard)
async logout(@Req() req):Promise<void> {
  const userId = req.user.id;
  await this.userService.logout(userId);
}




@Post('refresh')
@UseGuards(RefreshTokenGuard)

async refreshToken(@Body('refreshToken') refreshToken: string, @Request() req){
  const id = req.user.id; 
   console.log(id)
    return this.userService.refreshTokens(id, refreshToken);
}





 
  @Get('/profile')
@UseGuards(JwtAuthGuard)
async getProfile(@Request() req) {
  const { id, email } = req.user;
  return {
    id,
    email,
  };
}
  }







  
  
  
  
  


  
  
  




  
  
  

