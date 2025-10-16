import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserResponse{
    @IsString()
    @IsNotEmpty()
    fullName: string;
    
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    username: string;
}