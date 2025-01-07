import { OmitType } from '@nestjs/swagger';
import { TaskDto } from './task.dto';

export class CreateTaskDto extends OmitType(TaskDto, ['id']) {
  constructor(data: Partial<CreateTaskDto>) {
    super();
    Object.assign(this, data);
  }
}
