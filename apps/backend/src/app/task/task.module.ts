import { Module } from '@nestjs/common';
import { TaskService } from './providers/task.service';
import { TaskInMemoryService } from './providers/task-in-memory.service';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService, TaskInMemoryService],
})
export class TaskModule {}
