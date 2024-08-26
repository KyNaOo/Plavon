import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { encodePassword } from '../utils/hashService';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userAlreadyExist = await this.findOneByEmail(createUserDto.email);

      if (userAlreadyExist) {
        throw new ConflictException('This email is already in use');
      }

      const hashedPassword = encodePassword(createUserDto.password);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findAllExceptedOne(excludedUserId: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id != :excludedUserId', { excludedUserId })
      .getMany();
  }

  async findOne(
    id: string,
    options?: { relations: string[] },
  ): Promise<User | null> {
    if (options) {
      return await this.userRepository.findOne({
        ...options,
        where: { id: id },
      });
    }
    return await this.userRepository.findOneBy({ id });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }

  async save(user: User | null) {
    if (user) {
      return this.userRepository.save(user);
    }
    return null;
  }

  async addFriend(userId: string, friendId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['friends'],
    });

    const friend = await this.userRepository.findOne({
      where: {
        id: friendId,
      },
      relations: ['friends'],
    });

    if (user && friend) {
      user.friends.push(friend);
      friend.friends.push(user);
      await this.userRepository.save(user);
      await this.userRepository.save(friend);
    }
  }

  async removeFriend(userId: string, friendId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['friends'],
    });

    const friend = await this.userRepository.findOne({
      where: {
        id: friendId,
      },
      relations: ['friends'],
    });

    if (user && friend) {
      user.friends = user.friends.filter((f) => f.id !== friendId);
      friend.friends = friend.friends.filter((f) => f.id !== userId);
      await this.userRepository.save(friend);
      return await this.userRepository.save(user);
    }
  }

  async getFriends(userId: string): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['friends'],
    });
    return user ? user.friends : [];
  }
}
