import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './Entities/user.entity.js';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto.js';
import { UpdateProfileDto } from './dto/update-user-profile.dto.js';
@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findByEmail(email: string, throwIfNotFound?: boolean): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user && throwIfNotFound) {
      throw new Error('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
  async searchUsers(email: string, username: string): Promise<User[]> {

    try {
      const queryBuilder = this.userRepository.createQueryBuilder('user');

      if (email) {
        queryBuilder.andWhere('user.email LIKE :email', { email: `%${email}%` });
      }
      if (username) {
        queryBuilder.andWhere('user.username ILIKE :username', { username: `%${username}%` });
      }

    const users = await queryBuilder.getMany();
    return users;
    } catch (error: any) {
      throw new InternalServerErrorException('Error searching users: ' + error.message);
    }
  }

  async createUser(payload: RegisterDto): Promise<User> {
    const newUser = this.userRepository.create({
      email: payload.email,
      password: payload.password,
      username: payload.username,
    });
    return this.userRepository.save(newUser);
  }

  // User profile update service
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Merge partial updates (username, profilePicture, language, etc.)
    Object.assign(user, updateProfileDto);

    const updatedUser = await this.userRepository.save(user);

    // Strip password before returning response
    const { password, ...result } = updatedUser;
    return {
      message: 'Profile updated successfully',
      user: result,
    };
}
}

