import { Controller, Get, Param, NotFoundException, Query, UseGuards, ClassSerializerInterceptor, UseInterceptors, Patch, Body, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { LocalAuthenticationGuard } from '../auth/localAuthentication.guard.js';
import { UpdateProfileDto } from './dto/update-user-profile.dto.js';
import type { Request } from 'express';

@UseGuards(LocalAuthenticationGuard)
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
  @UseGuards(LocalAuthenticationGuard) // Protect this route so req.user is populated
  async updateProfile(
    @Req() req: Request & { user?: { id?: string; userId?: string } },
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    // Extracts user ID from the JWT payload attached to the
    //  request
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException();
    }
    return this.usersService.updateProfile(userId, updateProfileDto);
  }

}