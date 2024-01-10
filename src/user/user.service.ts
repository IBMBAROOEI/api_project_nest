import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';
import { User, UserDocument } from './schemas/user.schemas';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserModule } from './user.module';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async checkemail({ email }): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;

    const isDuplicate = await this.checkemail({ email });
    if (isDuplicate) {
      throw new BadRequestException('ایمیل تکراری است');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.userModel.create({ email, password: hashedPassword });
    const tokens = await this.getTokens(newUser._id, newUser.email);


    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

 






  async updateRefreshToken(_id: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userModel.findByIdAndUpdate(_id, { refreshToken: hashedRefreshToken }).exec();

   
  }







  hashData(data: string) {
    return argon2.hash(data);
  }



  // async refreshTokens(id: string, refreshToken: string) {

  //   const user = await this.findById(id);
  //   if (!user || !user.refreshToken) {
  //     throw new ForbiddenException('Access Denied');
  //   }
  
  //   const refreshTokenMatches = await bcrypt.compare(refreshToken,user.refreshToken);

  //   if (refreshTokenMatches) {
  //     console.log("jikji")
  // }else{

  //   console.log("j6236236236ikji")

  // }

  //   if (!refreshTokenMatches) {
  //     throw new ForbiddenException('Access Denied');
  //   }
  
  //   const tokens = await this.getTokens(user._id, user.email);
  //   await this.updateRefreshToken(user._id, tokens.refreshToken);
  //   return tokens;
  // }







  async refreshTokens(id: string,@new Headers('Authorization') authorization: string, refreshToken: string): Promise<{ accessToken: string; refreshToken: string; }> {

    
    const user = await this.findById(id);
    if (!user || !user.refreshToken){
      throw new ForbiddenException('Accesoihihihs Denied');

    }
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }
  










  async loginuser(createUserDto: CreateUserDto): Promise<any> {

   
      const  {email, password}=createUserDto;

        const user=await this.findByEmail(email);
        
        if(!user)



           throw new BadRequestException('User does not exist');

           const checkpass=
               await bcrypt.compare(password,user.password);
               if(!checkpass)
               
               throw new BadRequestException('password incorect');
    const tokens = await this.getTokens(user._id, user.email);


    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }












  
    //  async loginuser (data: CreateUserDto){
      
      

    //   // const  {email, password}=createUserDto;

    //     const user=await this.findByEmail(data.email);
        
    //     if(!user)



    //        throw new BadRequestException('User does not exist');
        
        
    //     const checkpass=
    //     await bcrypt.compare(data.password,user.password);
    //     if(!checkpass)
        
    //     throw new BadRequestException('password incorect');
        

    //     const tokens = await this.getTokens(user._id, user.email);


    //     await this.updateRefreshToken(user._id, tokens.refreshToken);
    //     return tokens;
    //   }
    
        


    // }









  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  // async findById(id: string): Promise<User> {

  //   return this.userModel.findById(id).exec();
  // }



  // async findById(_id: string): Promise<User> {
  //   console.log(_id)
  //   return this.userModel.findById(_id).exec();
  // }

  // async findById(user: User): Promise<User|any> {
  //   const payload = { sub: user._id };
 
  //    console.log(payload);
  //   return payload;

  // }


  async findById(id: string): Promise<User | undefined> {

    
     
     const m=  await this.userModel.findOne({ id }).exec();
     return m;


  }




  async logout(id: string):Promise<void>{


    await this.userModel.updateOne(


      { _id: id },
      {$set:{refreshToken:null}}
    )
  }


 
  

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: 'secret',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: 'secret',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

}