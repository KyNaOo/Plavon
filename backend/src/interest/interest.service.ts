import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Injectable()
export class InterestService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createInterestDto: CreateInterestDto) {
    return 'This action adds a new interest';
  }

  findAll() {
    return `This action returns all interest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interest`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateInterestDto: UpdateInterestDto) {
    return `This action updates a #${id} interest`;
  }

  remove(id: number) {
    return `This action removes a #${id} interest`;
  }
}
