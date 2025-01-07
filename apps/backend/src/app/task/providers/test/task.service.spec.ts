import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { TaskInMemoryService } from '../task-in-memory.service';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskDto } from '../../dto/task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskInMemoryService: TaskInMemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskInMemoryService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskInMemoryService = module.get<TaskInMemoryService>(TaskInMemoryService);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  describe('create', () => {
    it('should call TaskInMemoryService.create with the correct parameters', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const createdTask: TaskDto = {
        id: 1,
        ...createTaskDto,
      };

      jest.spyOn(taskInMemoryService, 'create').mockReturnValue(createdTask);

      const result = taskService.create(createTaskDto);

      expect(taskInMemoryService.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(createdTask);
    });
  });

  describe('findAll', () => {
    it('should call TaskInMemoryService.findAll and return the tasks', () => {
      const tasks: TaskDto[] = [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
        },
      ];

      jest.spyOn(taskInMemoryService, 'findAll').mockReturnValue(tasks);

      const result = taskService.findAll();

      expect(taskInMemoryService.findAll).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should call TaskInMemoryService.findOne with the correct id and return the task', () => {
      const task: TaskDto = {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      };

      jest.spyOn(taskInMemoryService, 'findOne').mockReturnValue(task);

      const result = taskService.findOne(1);

      expect(taskInMemoryService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(task);
    });
  });

  describe('update', () => {
    it('should call TaskInMemoryService.update with the correct parameters and return the updated task', () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
      };
      const updatedTask: TaskDto = {
        id: 1,
        title: updateTaskDto.title || '',
        description: updateTaskDto.description || '',
      };

      jest.spyOn(taskInMemoryService, 'update').mockReturnValue(updatedTask);

      const result = taskService.update(1, updateTaskDto);

      expect(taskInMemoryService.update).toHaveBeenCalledWith(1, updateTaskDto);
      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should call TaskInMemoryService.remove with the correct id and return the removed task', () => {
      const removedTask: TaskDto = {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      };

      jest.spyOn(taskInMemoryService, 'remove').mockReturnValue(removedTask);

      const result = taskService.remove(1);

      expect(taskInMemoryService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(removedTask);
    });
  });
});
