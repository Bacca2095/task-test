import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from '../dto/task.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskInMemoryService {
  private tasks: TaskDto[] = [];

  create(task: CreateTaskDto): TaskDto {
    const newTask: TaskDto = {
      ...task,
      id: this.generateRandomId(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): TaskDto[] {
    return this.tasks;
  }

  findOne(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  update(id: string, task: UpdateTaskDto) {
    const taskIndex = this.validateIfTaskExists(id);

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      title: task.title ?? this.tasks[taskIndex].title,
      description: task.description ?? this.tasks[taskIndex].description,
    };

    return this.tasks[taskIndex];
  }

  remove(id: string) {
    const taskIndex = this.validateIfTaskExists(id);
    const [removedTask] = this.tasks.splice(taskIndex, 1);
    return removedTask;
  }

  private validateIfTaskExists(id: string): number {
    const taskIndex = this.tasks.findIndex(
      (existingTask) => existingTask.id === id
    );
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return taskIndex;
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(7);
  }
}
