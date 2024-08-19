import { IsDefined, IsUUID } from 'class-validator';

export class JoinGroupDto {
  @IsDefined()
  @IsUUID()
  readonly userId: string;

  @IsDefined()
  @IsUUID()
  readonly groupId: string;
}
