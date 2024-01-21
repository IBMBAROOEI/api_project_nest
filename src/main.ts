import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as passport from 'passport';
// import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    errorHttpStatusCode:422,
  }))


  // app.use(

  //   session({
  //     secret:'secret',
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(4000);
}
bootstrap();

