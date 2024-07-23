import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestDto } from './create-interest.dto';
import { IsString } from 'class-validator';

export class UpdateInterestDto extends PartialType(CreateInterestDto) {
  @IsString()
  name: string;
}
