import { Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerUserDto: RegisterUserDto){
        return await this.authService.register(registerUserDto);
    }

    @Post('login')
    async login(@Body() loginRequestDto: LoginRequestDto){
        return this.authService.login(loginRequestDto.email, loginRequestDto.password);
    }

   
}
