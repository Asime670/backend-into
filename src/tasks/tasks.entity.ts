// src/tasks/task.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier automatically generated

  @Column()
  title: string; // Title of the task

  @Column({ nullable: true })
  description?: string; // Optional detailed description

  @Column({ default: false })
  isCompleted: boolean; // Status flag (default is unfinished)

  @Column({ nullable: true }) // Store relative file path or filename
  image: string;
}