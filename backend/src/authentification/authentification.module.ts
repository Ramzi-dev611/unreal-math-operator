import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthentificationController } from './controller/authentification.controller';
import { AuthentificationService } from './service/authentification.service';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});
if (process.env.JWT_SECRET == undefined) {
  dotenv.config({
    path: 'prod.env',
  });
}

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
})
export class AuthentificationModule {
  constructor(private readonly configService: ConfigService) {}
}
