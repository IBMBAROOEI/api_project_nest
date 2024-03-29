import { BadRequestException, ForbiddenException, HttpStatus, Injectable, HttpException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';
import { User, UserDocument } from './schemas/user.schemas';
import { Model } from 'mongoose';

import { Configerror } from '../Erorrhandel/reponse.service';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserModule } from './user.module';
import { error } from 'console';

@Injectable()
export class UserService {




  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configerror: Configerror,
  ) { }

  async checkemail({ email }): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { email, password } = createUserDto;

      const isDuplicate = await this.checkemail({ email });
      if (isDuplicate) {
        this.configerror.setSuccess(false);
        this.configerror.addError('ایمیل تکرای است ')
        throw new HttpException(this.configerror.getResponse(), HttpStatus.BAD_REQUEST);

      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);
      const newUser = await this.userModel.create({ email, password: hashedPassword });
      const tokens = await this.getTokens(newUser._id, newUser.email);
       await this.updateRefreshToken(newUser._id, tokens.refreshToken);

      this.configerror.setSuccess(true);
      this.configerror.setData(tokens);
      return this.configerror.getResponse();
    } catch (error) {

      this.configerror.setSuccess(false);
      this.configerror.addError('خطا درایجاد کاربر');
      throw new HttpException(this.configerror.getResponse(), HttpStatus.

        INTERNAL_SERVER_ERROR)

    }



  }

  async updateRefreshToken(_id: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userModel.findByIdAndUpdate(_id, { refreshToken: hashedRefreshToken }).exec();


  }


  hashData(data: string) {
    return argon2.hash(data);
  }

  async refreshTokens(id: string, refreshToken: string): Promise<{ accessToken: string; refreshToken: string; }> {

    const user = await this.findById(id);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('شما مجاز نیستید');

    }
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('شما مجاز نیستید');
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }



  async loginuser(createUserDto: CreateUserDto): Promise<any> {

    try {
      const { email, password } = createUserDto;
      const user = await this.checkemail({ email });
      if (!user) {
        this.configerror.setSuccess(false);
        this.configerror.addError('ایمیل کاربر ثبت  نیست ')
        throw new HttpException(this.configerror.getResponse(), HttpStatus.BAD_REQUEST);

      }

      const checkpass = await bcrypt.compare(password, user.password);
      if (!checkpass) {

        this.configerror.setSuccess(false);
        this.configerror.addError("پسورد اشتباه هست ")

        throw new HttpException(this.configerror.getResponse(), HttpStatus.BAD_REQUEST);
      }
      const tokens = await this.getTokens(user._id, user.email);
      await this.updateRefreshToken(user._id, tokens.refreshToken);

      this.configerror.setSuccess(true);
      this.configerror.setMessage("کاربر با موفقیت لاگین  شد")

      this.configerror.setData(tokens);

      return this.configerror.getResponse();
    }

    catch (error) {
      this.configerror.setSuccess(false);
      this.configerror.addError("خطا در لاگین کاربر");
      throw new HttpException(this.configerror.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }




  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {

  return await this.userModel.findById(id ).exec();
  }




  async logout(id: string) {

    try {
      await this.userModel.updateOne(

        { _id: id },
        { $set: { refreshToken: null } }
      );
      this.configerror.setSuccess(true);

      this.configerror.setMessage("کاربر با موفقیت خارج شد")


      return this.configerror.getResponse();
    } catch (error) {
      this.configerror.setSuccess(false);
      this.configerror.addError("خطا ");
      throw new HttpException(this.configerror.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR)


    };

  }





  async getTokens(userId: string, email: string) {
    const acc=5;
    const refresg=10;
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: 'secret',
          expiresIn: `${acc}s`,
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: 'secret',
          expiresIn: `${refresg}d`,
        },
      ),
    ]);

   
  const accessTokenExpiresIn = this.jwtService.decode(accessToken);
  const refreshTokenExpiresIn = this.jwtService.decode(refreshToken);

  const data = {
    accessToken,
    refreshToken,
    accessTokenExpiresIn:`${acc}s`,
    refreshTokenExpiresIn:`${refresg}d`,
    user: {
      id: userId,
      email,
    },
  };

  return data;

  }
  


}