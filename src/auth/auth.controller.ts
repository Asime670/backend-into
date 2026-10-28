import { Controller, Post, Body, HttpCode, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { request } from 'http';
import { LocalAuthenticationGuard } from './localAuthentication.guard.js';
import type RequestWithUser from './requestWithUser.interface.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: RegisterDto) {
    return this.authService.register(createUserDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { password, ...userWithoutPassword } = request.user; // Exclude the password from the response
    void password;
    return userWithoutPassword;
  }
}