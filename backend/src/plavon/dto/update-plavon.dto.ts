import { PartialType } from '@nestjs/mapped-types';
import { CreatePlavonDto } from './create-plavon.dto';

export class UpdatePlavonDto extends PartialType(CreatePlavonDto) {}
