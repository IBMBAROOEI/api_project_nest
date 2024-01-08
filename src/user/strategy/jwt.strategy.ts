import {  Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user.service';
import { User } from '../user.schemas';


type JwtPayload = {
  id: string;
  email: string;
};


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  userService: any;
  constructor(private UserService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
   }

   
  // async validate(payload: any) {
     
    
  //    console.log(payload.sub,  payload.email,payload.id )
  //   return { userId: payload.sub, email: payload.email,id:payload.id };
  // }

  // async validate(payload: any): Promise<User> {
  //   const user = await this.userService.findById(payload.sub);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

 
  validate(payload: JwtPayload) {
    return payload;
  }

   
}