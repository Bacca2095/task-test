import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string | undefined;

  @IsString()
  @IsOptional()
  description: string | undefined;
}
