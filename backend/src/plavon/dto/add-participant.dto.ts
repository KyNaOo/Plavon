import { IsDefined, IsUUID } from 'class-validator';

export class AddParticipantDto {
  @IsDefined()
  @IsUUID()
  readonly plavonId: string;
  @IsDefined()
  @IsUUID()
  readonly userId: string;
}
