import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule, // Gives access to UsersService
    JwtModule.register({
      global: true,
      secret: 'MY_SUPER_SECRET_KEY_123', // Secret used to sign tokens
      signOptions: { expiresIn: '1h' },  // Token expires in 1 hour
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}