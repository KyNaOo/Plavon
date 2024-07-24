import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlavonDto } from './dto/create-plavon.dto';
import { UpdatePlavonDto } from './dto/update-plavon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plavon } from './entities/plavon.entity';
import { User } from '../user/entities/user.entity';
import { AddParticipantDto } from './dto/add-participant.dto';

@Injectable()
export class PlavonService {
  constructor(
    @InjectRepository(Plavon)
    private plavonRepository: Repository<Plavon>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createPlavonDto: CreatePlavonDto) {
    const plavon = this.plavonRepository.create(createPlavonDto);
    const author = await this.userRepository.findOne({
      where: { id: createPlavonDto.authorId },
    });

    if (!author) {
      throw new NotFoundException(
        `User with id ${createPlavonDto.authorId} not found`,
      );
    }

    plavon.author = author;
    plavon.participants = [author];
    author.createdPlavons.push(plavon);
    author.joinedPlavons.push(plavon);

    const [plavonSaved] = await Promise.all([
      this.plavonRepository.save(plavon),
      this.userRepository.save(author),
    ]);

    return plavonSaved;
  }

  async findAll() {
    return await this.plavonRepository.find();
  }

  async findOne(id: string) {
    const plavon = await this.plavonRepository.findOneBy({ id });

    if (!plavon) {
      throw new NotFoundException(`Plavon with id ${id} not found`);
    }

    return plavon;
  }

  async update(id: string, data: UpdatePlavonDto) {
    const plavon = await this.plavonRepository.findOneBy({ id });

    if (!plavon) {
      throw new NotFoundException(`Plavon with id ${id} not found`);
    }

    Object.assign(plavon, data);

    return await this.plavonRepository.save(plavon);
  }

  async addParticipant(id: string, data: AddParticipantDto) {
    const [plavon, user] = await Promise.all([
      this.plavonRepository.findOneBy({ id }),
      this.userRepository.findOneBy({ id }),
    ]);

    if (!plavon) {
      throw new NotFoundException(`Plavon with id ${id} not found`);
    }
    if (!user) {
      throw new NotFoundException(`User with id ${data.userId} not found`);
    }
    plavon.participants.push(user);
    user.joinedPlavons.push(plavon);

    const [plavonSaved] = await Promise.all([
      this.plavonRepository.save(plavon),
      this.userRepository.save(user),
    ]);

    return plavonSaved;
  }

  async remove(id: string) {
    return await this.plavonRepository.delete(id);
  }
}
