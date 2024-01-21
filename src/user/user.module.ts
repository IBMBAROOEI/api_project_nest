import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { User, UserSchema } from './schemas/user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Configerror } from '../Erorrhandel/reponse.service';

import { RefreshTokenStrategy } from './strategy/jwt.strategyRefresh';

@Module({
  controllers: [UserController],
  providers: [Configerror, UserService, JwtStrategy, RefreshTokenStrategy],
  imports: [
    JwtModule.register({
      // secret:"secret",
      // signOptions:{expiresIn:"1h"},
    }),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {
  static findOne: any;
}
