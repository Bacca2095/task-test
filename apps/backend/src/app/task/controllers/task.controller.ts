import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from '../providers/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskDto } from '../dto/task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskDto })
  create(@Body() createTaskDto: CreateTaskDto): TaskDto {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOkResponse({ type: [TaskDto] })
  findAll(): TaskDto[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskDto })
  @ApiNotFoundResponse({ description: 'Task not found' })
  findOne(@Param('id') id: string): TaskDto {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TaskDto })
  @ApiNotFoundResponse({ description: 'Task not found' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): TaskDto {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskDto })
  @ApiNotFoundResponse({ description: 'Task not found' })
  remove(@Param('id') id: string): TaskDto {
    return this.taskService.remove(id);
  }
}
