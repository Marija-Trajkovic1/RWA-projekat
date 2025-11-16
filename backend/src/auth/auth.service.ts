import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        private usersService:UsersService, 
        private jwtService : JwtService) 
    {}

    async register(registerDto: RegisterUserDto){
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

    async login(email:string, password:string){
        const user = await this.usersService.findUserByEmail(email);
        if(!user){
            throw new UnauthorizedException('Invaid credentials!');
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new UnauthorizedException('Invaid password!');
        }

        const payload = {email: user.email, sub: user.id};
        return{
            access_token: await this.jwtService.signAsync(payload),
        };
       
    }

}
