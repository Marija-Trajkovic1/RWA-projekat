import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class AuthService {

    register(createUserDto:CreateUserDto){}
}
