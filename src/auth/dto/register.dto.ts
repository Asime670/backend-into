import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string
    @IsString()
    username: string
}