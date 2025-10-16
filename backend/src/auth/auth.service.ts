import { Body, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginRequestDto } from './dto/login-request.dto';
import * as bcrypt from 'bcrypt';
import passport from 'passport';
import { User } from 'src/users/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService, 
        private jwtService : JwtService) 
    {}

    async register(registerDto: RegisterUserDto): Promise<{message:string}>{
        const existingUser= await this.usersService.findUserByEmail(registerDto.email);
        if(existingUser){
            throw new ConflictException('User with this email already existis!');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 11);
        const userToRegister = {...registerDto, password: hashedPassword}

        try{
            await this.usersService.create(userToRegister);
            return {
                message:'Succesfuly registered!'
            }
        }catch(error){
            console.log('Error while registering:', error);
            throw new InternalServerErrorException('Error while registering user!');
        }
    }

    

}
