import { TaskInMemoryService } from '../task-in-memory.service';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TaskInMemoryService', () => {
  let service: TaskInMemoryService;

  beforeEach(() => {
    service = new TaskInMemoryService();
  });

  describe('create', () => {
    it('should create a new task and return it', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const result = service.create(createTaskDto);

      expect(result).toEqual({
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
      });
      expect(service.findAll()).toHaveLength(1);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', () => {
      service.create({ title: 'Task 1', description: 'Description 1' });
      service.create({ title: 'Task 2', description: 'Description 2' });

      const result = service.findAll();

      expect(result).toHaveLength(2);
      expect(result).toEqual([
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
      ]);
    });
  });

  describe('findOne', () => {
    it('should return the task with the given id', () => {
      service.create({ title: 'Task 1', description: 'Description 1' });

      const result = service.findOne(1);

      expect(result).toEqual({
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      });
    });

    it('should throw a NotFoundException if the task is not found', () => {
      expect(() => service.findOne(99)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update the task with the given id and return it', () => {
      service.create({ title: 'Task 1', description: 'Description 1' });

      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
      };

      const result = service.update(1, updateTaskDto);

      expect(result).toEqual({
        id: 1,
        title: 'Updated Task',
        description: 'Updated Description',
      });
      expect(service.findAll()).toHaveLength(1);
    });

    it('should update only the provided fields', () => {
      service.create({ title: 'Task 1', description: 'Description 1' });

      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Description 1',
      };

      const result = service.update(1, updateTaskDto);

      expect(result).toEqual({
        id: 1,
        title: 'Updated Task',
        description: 'Description 1',
      });
    });

    it('should throw a NotFoundException if the task is not found', () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Non-existent Task',
        description: 'Non-existent Description',
      };

      expect(() => service.update(99, updateTaskDto)).toThrow(
        NotFoundException
      );
    });
  });

  describe('remove', () => {
    it('should remove the task with the given id and return it', () => {
      service.create({ title: 'Task 1', description: 'Description 1' });
      service.create({ title: 'Task 2', description: 'Description 2' });

      const result = service.remove(1);

      expect(result).toEqual({
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      });
      expect(service.findAll()).toHaveLength(1);
    });

    it('should throw a NotFoundException if the task is not found', () => {
      expect(() => service.remove(99)).toThrow(NotFoundException);
    });
  });
});
