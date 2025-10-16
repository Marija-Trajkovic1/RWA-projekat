import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ) {}

    async create(registerUserDto: RegisterUserDto):Promise<User>{
        const user = this.userRepository.create(registerUserDto);
        return this.userRepository.save(user);    
    }

    async findUserByEmail(email: string): Promise<User | null>{
        
        return this.userRepository.findOneBy({email: email});
    }

    async findUserById(id:number): Promise<User | null>{
        return this.userRepository.findOneBy({id: id});
    }

}
