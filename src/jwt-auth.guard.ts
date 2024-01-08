import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
             console.log(err);
          throw new UnauthorizedException({ message: 'شما مجوز ندارید', statusCode: 401 });
        }
        return user;
      }
 
}