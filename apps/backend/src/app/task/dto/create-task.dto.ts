import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  constructor(data: Partial<CreateTaskDto>) {
    Object.assign(this, data);
  }
}
