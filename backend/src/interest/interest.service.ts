import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  create(createInterestDto: CreateInterestDto) {
    const interest = this.interestRepository.create(createInterestDto);
    return this.interestRepository.save(interest);
  }

  findAll() {
    return this.interestRepository.find();
  }

  findOne(id: string) {
    return this.interestRepository.findOneBy({ id });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateInterestDto: UpdateInterestDto) {
    return `This action updates a #${id} interest`;
  }

  remove(id: string) {
    return `This action removes a #${id} interest`;
  }
}
