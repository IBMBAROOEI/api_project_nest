import {  Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';


type JwtPayload = {
  id: string;
  email: string;
};


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  userService: any;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
      passReqtoCallback:true
    });
   }

   validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }


   
}