import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString,Matches } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^~()\[\]{}|;:"'<>,./?+=_\\-])[A-Za-z\d@$!%*?&#^~()\[\]{}|;:"'<>,./?+=_\\-]{8,}$/,
    {
      message:
        'Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, et un caractère spécial',
    },
  )
  password: string;
}
