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
      id: this.tasks.length + 1,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): TaskDto[] {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  update(id: number, task: UpdateTaskDto) {
    const taskIndex = this.validateIfTaskExists(id);

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      title: task.title ?? this.tasks[taskIndex].title,
      description: task.description ?? this.tasks[taskIndex].description,
    };

    return this.tasks[taskIndex];
  }

  remove(id: number) {
    const taskIndex = this.validateIfTaskExists(id);
    const [removedTask] = this.tasks.splice(taskIndex, 1);
    return removedTask;
  }

  private validateIfTaskExists(id: number): number {
    const taskIndex = this.tasks.findIndex(
      (existingTask) => existingTask.id === id
    );
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return taskIndex;
  }
}
