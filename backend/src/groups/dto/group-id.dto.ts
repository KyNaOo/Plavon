import { IsUUID } from 'class-validator';

export class GroupIdDto {
  @IsUUID()
  readonly id: string;
}
