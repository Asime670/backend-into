import { Controller, Get, Query, UseGuards, ClassSerializerInterceptor, UseInterceptors, Patch, Body, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtAuthenticationGuard } from '../auth/jwtAuthentication.guard.js';
import { UpdateProfileDto } from './dto/update-user-profile.dto.js';
import type { Request } from 'express';

// JWT required — send Authorization: Bearer <access_token>
@UseGuards(JwtAuthenticationGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //create another endpoint to get all users. It should return a list of all users in the database. If no users are found, return an empty list.
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return {
      success: true,
      data: users ?? [],
    };
  }


  // modify to become a search endpoint with email, username filters. Is should return a list of users that match the search criteria. If no users are found, return an empty list.
  @Get('search')
  @UseInterceptors(ClassSerializerInterceptor)
  async searchUsers(
    @Query('email') email: string,
    @Query('username') username: string) {

    const users = await this.usersService.searchUsers(email, username);
    return {
      success: true,
      data: users ?? [],
      message: 'Users retrieved successfully',
    };
  }

  @Patch('profile')
  async updateProfile(
    @Req() req: Request & { user?: { id?: string; userId?: string } },
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    // User id comes from the JWT (req.user), set by JwtStrategy
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException();
    }
    return this.usersService.updateProfile(userId, updateProfileDto);
  }

}
