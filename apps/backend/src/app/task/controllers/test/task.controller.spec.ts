import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { TaskService } from '../../providers/task.service';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskDto } from '../../dto/task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
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

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call TaskService.create with the correct parameters and return the created task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };
      const createdTask: TaskDto = {
        id: 1,
        ...createTaskDto,
      };

      jest.spyOn(service, 'create').mockReturnValue(createdTask);

      const result = controller.create(createTaskDto);

      expect(service.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(createdTask);
    });
  });

  describe('findAll', () => {
    it('should call TaskService.findAll and return the list of tasks', () => {
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

      jest.spyOn(service, 'findAll').mockReturnValue(tasks);

      const result = controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should call TaskService.findOne with the correct id and return the task', () => {
      const task: TaskDto = {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      };

      jest.spyOn(service, 'findOne').mockReturnValue(task);

      const result = controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(task);
    });
  });

  describe('update', () => {
    it('should call TaskService.update with the correct parameters and return the updated task', () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
      };
      const updatedTask: TaskDto = {
        id: 1,
        title: updateTaskDto.title || '',
        description: updateTaskDto.description || '',
      };

      jest.spyOn(service, 'update').mockReturnValue(updatedTask);

      const result = controller.update(1, updateTaskDto);

      expect(service.update).toHaveBeenCalledWith(1, updateTaskDto);
      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should call TaskService.remove with the correct id and return the removed task', () => {
      const removedTask: TaskDto = {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      };

      jest.spyOn(service, 'remove').mockReturnValue(removedTask);

      const result = controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(removedTask);
    });
  });
});
