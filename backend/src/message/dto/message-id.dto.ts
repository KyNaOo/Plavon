import { IsDefined, IsUUID } from 'class-validator';

export class MessageIdDto {
  @IsDefined()
  @IsUUID()
  id: string;
}
