import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { create } from 'domain';

@Controller('auth')
export class AuthController {

    constructor(private service: AuthService){}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto){
        return this.service.register(createUserDto);
    }

    @Post('login')
    login(){}
}
