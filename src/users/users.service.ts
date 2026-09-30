import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    // Pre-hashed version of the string "password123" using bcrypt (10 salt rounds)
  private defaultPasswordHash = bcrypt.hashSync('password123', 10);
  
  // In-memory array storing user records
  private users: any[] = [
    {
      id: '1',
      email: 'admin@example.com',
      password: this.defaultPasswordHash,
      role: 'admin',
    },
    {
      id: '2',
      email: 'john@example.com',
      password: this.defaultPasswordHash,
      role: 'user',
    },
  ];

  // Helper method to locate a user by email
  findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  // Method to insert a new user object into our array
  create(user: any) {
    const newUser = {
      id: Date.now().toString(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}