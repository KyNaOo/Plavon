import { IsString, IsUUID } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  readonly name: string;

  @IsUUID()
  readonly creatorId: number;
}
