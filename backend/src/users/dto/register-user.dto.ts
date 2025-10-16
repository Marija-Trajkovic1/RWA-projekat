import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterUserDto{

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(6)
    password:string;

    
}