import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from '../providers/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskDto } from '../dto/task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): TaskDto {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(): TaskDto[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): TaskDto {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto
  ): TaskDto {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): TaskDto {
    return this.taskService.remove(id);
  }
}
