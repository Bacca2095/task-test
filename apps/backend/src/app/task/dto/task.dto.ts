import { IsNumber, IsString } from 'class-validator';

export class TaskDto {
  @IsNumber()
  id!: number;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  constructor(data: Partial<TaskDto>) {
    Object.assign(this, data);
  }
}
