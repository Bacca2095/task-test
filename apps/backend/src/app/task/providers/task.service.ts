import { Injectable } from '@nestjs/common';
import { TaskInMemoryService } from './task-in-memory.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskInMemory: TaskInMemoryService) {}

  create(task: CreateTaskDto): TaskDto {
    return this.taskInMemory.create(task);
  }

  findAll(): TaskDto[] {
    return this.taskInMemory.findAll();
  }

  findOne(id: number): TaskDto {
    return this.taskInMemory.findOne(id);
  }

  update(id: number, task: UpdateTaskDto): TaskDto {
    return this.taskInMemory.update(id, task);
  }

  remove(id: number): TaskDto {
    return this.taskInMemory.remove(id);
  }
}
