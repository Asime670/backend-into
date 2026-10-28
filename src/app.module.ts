import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PostModule } from './post/post.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AuthService } from './auth/auth.service.js';
import { AuthController } from './auth/auth.controller.js';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SynapseConfigService } from './config/synapseConfig.service.js';
import { User } from './users/Entities/user.entity.js';
import { TasksModule } from './tasks/tasks.module.js';
import { Task } from './tasks/tasks.entity.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env.dev',

      }
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, TasksModule],
      inject: [SynapseConfigService],
      extraProviders: [SynapseConfigService],

      useFactory: (configService: SynapseConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL, // Or process.env.POSTGRES_URL
        ssl: {
          rejectUnauthorized: false, // Required for Neon cloud connections
        },
        entities: [User, Task],
        synchronize: true, // Set to false in production
      }),
    }),


    PostModule,
    UsersModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, SynapseConfigService],
})
export class AppModule { }
