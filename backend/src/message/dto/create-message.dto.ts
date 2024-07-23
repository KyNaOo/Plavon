import { IsDefined, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsDefined()
  content: string;

  @IsDefined()
  @IsUUID()
  groupId: string;

  @IsDefined()
  @IsUUID()
  authorId: string;
}
