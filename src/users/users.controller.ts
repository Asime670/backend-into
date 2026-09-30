import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find-by-email/:email')
  findByEmail(@Param('email') email: string) {
    const user = this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }

    return {
      success: true,
      data: user,
    };
  }
}