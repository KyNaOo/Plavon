import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { IsDefined, IsString, IsUUID } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @IsString()
  content: string;
}
