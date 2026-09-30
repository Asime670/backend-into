import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: RegisterDto) {
    return this.authService.register(createUserDto);
  }


  @Post('login')
  login(@Body() body: RegisterDto) {
    return this.authService.login(body);
  }
}