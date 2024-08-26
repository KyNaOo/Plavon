import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { InterestService } from '../interest/interest.service';
import { Interest } from '../interest/entities/interest.entity';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly interestService: InterestService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('/email/:email')
  findOne(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get(':userId/interests')
  async getUserInterests(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId, {
      relations: ['interests'],
    });
    return user?.interests;
  }

  @Get(':userId/available-interests')
  async getAvailableUserInterests(
    @Param('userId') userId: string,
  ): Promise<Interest[]> {
    const user = await this.userService.findOne(userId, {
      relations: ['interests'],
    });

    if (!user) {
      throw new Error(`User not found.`);
    }

    const allInterests = await this.interestService.findAll();
    const userInterestIds = user.interests.map((interest) => interest.id);

    return allInterests.filter(
      (interest) => !userInterestIds.includes(interest.id),
    );
  }

  @Put(':userId/interests')
  async updateUserInterests(
    @Param('userId') userId: string,
    @Body('interests') interestIds: string[],
  ) {
    const user = await this.userService.findOne(userId, {
      relations: ['interests'],
    });
    if (!user) {
      throw new Error(`User not found.`);
    }

    const newInterests = await Promise.all(
      interestIds.map(async (id) => {
        const interest = await this.interestService.findOne(id);
        return interest ?? null;
      }),
    );

    user.interests = newInterests.filter(
      (interest): interest is Interest => interest !== null,
    );

    return this.userService.save(user);
  }

  @Post(':userId/friends/:friendId')
  async addFriend(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ): Promise<void> {
    await this.userService.addFriend(userId, friendId);
  }

  @Delete(':userId/friends/:friendId')
  async removeFriend(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ): Promise<void> {
    await this.userService.removeFriend(userId, friendId);
  }

  @Get(':userId/friends')
  async getFriends(@Param('userId') userId: string): Promise<User[]> {
    return this.userService.getFriends(userId);
  }
}
