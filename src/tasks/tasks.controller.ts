// src/tasks/tasks.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

//Multer storage configuration for file uploads
const storageOptions = {
    storage: diskStorage({
        destination: './upload', // Local directory to store files
        filename: (req, file, callback) => {
            // Generate a unique filename: timestamp + random string + extension
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `task-${uniqueSuffix}${ext}`);
        },
    }),
};


@Controller('tasks') // Base path: /tasks
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    // POST /tasks - Create task
    @Post()
    @UseInterceptors(FileInterceptor('file', storageOptions)) // Handle file upload
    create(@Body() createTaskDto: CreateTaskDto,
        @UploadedFile() file: Express.Multer.File) {
        const imagePath: string = file ? file.filename : '';
        return this.tasksService.create(createTaskDto, imagePath);
    }

    // GET /tasks - Fetch all tasks
    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    // GET /tasks/:id - Fetch one task
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.findOne(id);
    }

    // PUT /tasks/:id - Update task
    @Put(':id')
    @UseInterceptors(FileInterceptor('file', storageOptions)) // Handle file upload
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        const imagePath = file ? file.filename : null;
        return this.tasksService.update(id, updateTaskDto, imagePath);
    }

    // DELETE /tasks/:id - Delete task
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.remove(id);
    }
}