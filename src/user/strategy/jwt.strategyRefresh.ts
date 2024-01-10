import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import express, { Request } from 'express';

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

  validate(req: express.Request, payload: JwtPayload) {


    const refreshToken = req.headers.authorization.replace('Bearer', '').trim();

    return { ...payload, refreshToken };
  }
}