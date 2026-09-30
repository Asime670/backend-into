import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PostModule } from './post/post.module.js';
// import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AuthService } from './auth/auth.service.js';
import { AuthController } from './auth/auth.controller.js';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SynapseConfigService } from './config/synapseConfig.service.js';
import { UserEntity } from './users/Entities/user.entity.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: ['.env.development.local', '.env.dev'],
      
      }
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [SynapseConfigService],
      extraProviders: [SynapseConfigService],

      useFactory: (configService: SynapseConfigService) => ({        
        type: 'postgres',
        url: configService.dbConfig().url,
        entities: [UserEntity],
        synchronize: true, // Set to false in production
      }),
    }),


    PostModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule { }
