import { IsDefined, IsString, IsUUID } from 'class-validator';

export class RenameGroupDto {
  @IsUUID()
  @IsDefined()
  readonly id: string;

  @IsString()
  @IsDefined()
  readonly name: string;
}
