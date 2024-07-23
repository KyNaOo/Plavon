import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

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
