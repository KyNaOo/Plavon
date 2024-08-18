import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDefined,
  IsUUID,
} from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  recipient: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  metadata?: string;
}

export class UpdateNotificationDto {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  metadata?: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;
}
