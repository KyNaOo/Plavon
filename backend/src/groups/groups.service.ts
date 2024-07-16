import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  /**
   * Creates a new group with the given data and adds the creator as a member.
   *
   * @param {CreateGroupDto} createGroupDto - The data for creating the group.
   * @return {Promise<Group>} The newly created group.
   * @throws {NotFoundException} If the creator user is not found.
   *
   * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
   */
  async create(createGroupDto: CreateGroupDto) {
    const user = await this.userRepository.findOne({
      where: { id_user: createGroupDto.creatorId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const newGroup = this.groupRepository.create({
      ...createGroupDto,
      members: [user],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.groupRepository.save(newGroup);
  }

  findAll() {
    // TODO
  }

  findOne(id: number) {
    // TODO
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    // TODO
  }

  remove(id: number) {
    // TODO
  }
}
