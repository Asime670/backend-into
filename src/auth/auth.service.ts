import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {

    constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. REGISTER LOGIC
  async register(body: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(body.email, false);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash the password securely (10 salt rounds)
    const hashedPassword = bcrypt.hashSync(body.password, 10);

    // Save user with hashed password
    const newUser = await this.usersService.createUser({...body, password: hashedPassword});

    return {
      success: true,
      message: 'User registered successfully',
      userId: newUser.id,
    };
  }

      getAuthUser(email: string, password: string) {
        throw new Error('Method not implemented.');
    }

  // // 2. LOGIN LOGIC
  async login(body: LoginDto) {
    // Find user by email
    const user = await this.usersService.findByEmail(body.email, true);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare raw password from request with the hashed password in storage
    const isPasswordMatching = bcrypt.compareSync(body.password, user.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Prepare token payload
    const payload = { sub: user.id, email: user.email };

    // Sign payload into JWT access token
    const token = this.jwtService.sign(payload);
    

    return {
      success: true,
      message: 'Login successful',
      access_token: token,
    };
  }

}

