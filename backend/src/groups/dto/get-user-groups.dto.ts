import { IsUUID } from 'class-validator';

export class GetUserGroupsDto {
  @IsUUID()
  readonly userId: string;
}
