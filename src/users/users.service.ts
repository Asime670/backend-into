import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './Entities/user.entity.js';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto.js';
@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findByEmail(email: string, throwIfNotFound?: boolean): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user && throwIfNotFound) {
      throw new Error('User not found');
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }
  async searchUsers(email: string, username: string): Promise<UserEntity[]> {

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

  async createUser(payload: RegisterDto): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      email: payload.email,
      password: payload.password,
      username: payload.username,
    });
    return this.userRepository.save(newUser);
  }

}