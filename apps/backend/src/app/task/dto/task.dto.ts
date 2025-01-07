import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TaskDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  constructor(data: Partial<TaskDto>) {
    Object.assign(this, data);
  }
}
