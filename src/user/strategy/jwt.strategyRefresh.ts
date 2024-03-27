import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { request } from 'http';

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
      secretOrKey: 'secret',
      passReqToCallback: true
    });
  }

  async validate(req:Request, payload: JwtPayload) {

    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };

//     const refreshToken = request.body.refreshToken;
//     const userid=payload.id
  
// const user=await this.userService.findById(userid);

// if(!user){
//   throw new UnauthorizedException
// }
//     return { user, refreshToken };
//   }
  }
}