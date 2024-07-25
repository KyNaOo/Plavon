import { IsDate, IsDefined, IsString, IsUUID } from 'class-validator';

export class UpdatePlavonDto {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  color?: string;

  @IsDate()
  startTime?: Date;

  @IsDate()
  endTime?: Date;
}
