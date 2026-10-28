// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { Task } from './tasks.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Registers Task entity with TypeORM
  controllers: [TasksController],             // Registers API endpoints
  providers: [TasksService],                  // Registers business logic
})
export class TasksModule {}