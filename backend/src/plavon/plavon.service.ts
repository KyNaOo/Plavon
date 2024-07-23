import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlavonDto } from './dto/create-plavon.dto';
import { UpdatePlavonDto } from './dto/update-plavon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plavon } from './entities/plavon.entity';

@Injectable()
export class PlavonService {
  constructor(
    @InjectRepository(Plavon)
    private plavonRepository: Repository<Plavon>,
  ) {}
  async create(createPlavonDto: CreatePlavonDto) {
    const plavon = this.plavonRepository.create(createPlavonDto);
    return this.plavonRepository.save(plavon);
  }

  async findAll() {
    return this.plavonRepository.find();
  }

  async findOne(id: string) {
    return this.plavonRepository.findOneBy({ id });
  }

  async update(id: string, updatePlavonDto: UpdatePlavonDto) {
    const plavon = await this.plavonRepository.findOne({ where: { id } });
    if (!plavon) {
      throw new NotFoundException(`Le plavon n'a pas été trouvé !`);
    }
    Object.assign(plavon, updatePlavonDto);

    if (updatePlavonDto.groupId) {
      plavon.group = { id: updatePlavonDto.groupId } as never;
    }
    if (updatePlavonDto.authorId) {
      plavon.author = { id: updatePlavonDto.authorId } as never;
    }

    return this.plavonRepository.save(plavon);
  }

  async remove(id: string) {
    return this.plavonRepository.delete(id);
  }
}
