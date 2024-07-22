import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { RenameGroupDto } from './dto/rename-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User } from '../user/entities/user.entity';
import { JoinGroupDto } from './dto/join-group.dto';
import { LeaveGroupDto } from './dto/leave-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new group with the given data and adds the creator as a member.
   *
   * @param {CreateGroupDto} createGroupDto - The data for creating the group.
   * @return {Promise<Group>} The newly created group.
   * @throws {NotFoundException} If the creator user is not found.
   *
   * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
   */
  async create(data: CreateGroupDto) {
    const user = await this.userRepository.findOne({
      where: { id: data.creatorId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${data.creatorId} not found`);
    }

    const newGroup = this.groupRepository.create({
      ...data,
      members: [user],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.groupRepository.save(newGroup);
  }

  async joinGroup(data: JoinGroupDto): Promise<Group> {
    let group = await this.groupRepository.findOneBy({ id: data.groupId });

    if (!group) {
      throw new NotFoundException(`Group with id ${data.groupId} not found`);
    }

    const user = await this.userRepository.findOneBy({ id: data.userId });

    if (!user) {
      throw new NotFoundException(`User with id ${data.userId} not found`);
    }

    group.members.push(user);
    user.groups.push(group);

    await this.userRepository.save(user);
    group = await this.groupRepository.save(group);

    return group;
  }

  async leaveGroup(data: LeaveGroupDto): Promise<Group> {
    let group = await this.groupRepository.findOneByOrFail({
      id: data.groupId,
    });

    if (!group) {
      throw new NotFoundException(`Group with id ${data.groupId} not found`);
    }

    const user = await this.userRepository.findOneBy({ id: data.userId });

    if (!user) {
      throw new NotFoundException(`User with id ${data.userId} not found`);
    }

    group.members = group.members.filter((member) => member.id !== user.id);
    user.groups = user.groups.filter((member) => member.id !== group.id);

    await this.userRepository.save(user);
    group = await this.groupRepository.save(group);

    return group;
  }

  /**
   * Asynchronously finds and returns all groups.
   *
   * @return {Promise<Group[]>} A promise that resolves to an array of Group objects.
   */
  async findAll() {
    return await this.groupRepository.find();
  }

  /**
   * Finds and returns a group with the given id.
   *
   * @param {string} id - The id of the group to find.
   * @return {Promise<Group>} The found group, or throws a NotFoundException if not found.
   */
  async findOne(id: string) {
    const group = await this.groupRepository.findBy({ id });

    if (!group) {
      throw new NotFoundException(`Group with id ${id} not found`);
    }

    return group;
  }
  async findByUser(userId: string) {

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user.groups;
  }

  /**
   * Updates the name of a group with the provided id.
   *
   * @param {RenameGroupDto} data - The data containing the id of the group and the new name.
   * @return {Promise<void>} A promise that resolves after updating the group name.
   */
  async rename(data: RenameGroupDto) {
    return await this.groupRepository.update(data.id, { name: data.name });
  }

  /**
   * Removes a group with the specified ID.
   *
   * @param {string} id - The ID of the group to remove.
   * @return {Promise<void>} A promise that resolves when the group is deleted.
   */
  async remove(id: string) {
    return await this.groupRepository.delete(id);
  }
}
