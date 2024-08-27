import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlavonDto } from './dto/create-plavon.dto';
import { UpdatePlavonDto } from './dto/update-plavon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Plavon } from './entities/plavon.entity';
import { User } from '../user/entities/user.entity';
import { Group } from '../groups/entities/group.entity';

@Injectable()
export class PlavonService {
  constructor(
    @InjectRepository(Plavon)
    private plavonRepository: Repository<Plavon>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}
  async create(createPlavonDto: CreatePlavonDto) {
    const author = await this.userRepository.findOne({
      where: { id: createPlavonDto.authorId },
    });

    if (!author) {
      throw new NotFoundException('User not found');
    }

    const group = await this.groupRepository.findOne({
      where: { id: createPlavonDto.groupId },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const plavon = this.plavonRepository.create({
      name: createPlavonDto.name,
      description: createPlavonDto.description,
      author: author,
      group: group,
      startTime: createPlavonDto.startTime,
      endTime: createPlavonDto.endTime,
    });
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

  async findPlavonsForToday(author: string): Promise<Plavon[]> {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
    );

    const user = await this.userRepository.findOneBy({ id: author });
    if (!user) {
      throw new NotFoundException(`User with id ${author} not found`);
    }

    return await this.plavonRepository.find({
      where: {
        startTime: Between(now, endOfDay),
        author: user,
      },
      order: {
        startTime: 'ASC',
      },
    });
  }
}
