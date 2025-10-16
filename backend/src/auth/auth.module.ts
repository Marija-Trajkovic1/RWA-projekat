import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports :[
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      //signOptions:{expiresIn: process.env.JWT_EXPIRES_IN || '15m'},
    }), 
    UsersModule, 
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
