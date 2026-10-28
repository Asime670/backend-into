// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';



@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // 1. Create a task
  async create(createTaskDto: CreateTaskDto, _imagePath: string): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      image: _imagePath, // Store the image path if provided
    });
    return await this.taskRepository.save(task);
  }

  // 2. Get all tasks
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // 3. Get one task by ID
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // 4. Update a task by ID
  async update(id: number, updateTaskDto: UpdateTaskDto, imagePath: string | null): Promise<Task> {
    const task = await this.findOne(id); // Reuses findOne to check existence
    Object.assign(task, updateTaskDto); // Merges updated fields into existing task
    return await this.taskRepository.save(task);
  }

  // 5. Delete a task by ID
  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }
}