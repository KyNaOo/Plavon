import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupsService } from './groups.service';
import { Group } from './entities/group.entity';
import { User } from '../user/entities/user.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { NotFoundException } from '@nestjs/common';
import { GroupsGateway } from './groups.gateway';

describe('GroupsService', () => {
  let service: GroupsService;
  let groupRepository: Repository<Group>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Group, User])],
      providers: [
        GroupsGateway,
        GroupsService,
        {
          provide: getRepositoryToken(Group),
          useValue: groupRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  describe('create', () => {
    it('should create a new group with the creator as a member', async () => {
      const createGroupDto: CreateGroupDto = {
        name: 'Test Group',
        creatorId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const mockUser = new User();
      mockUser.id = createGroupDto.creatorId;

      const mockGroup = new Group();
      Object.assign(mockGroup, createGroupDto);
      mockGroup.members = [mockUser];

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(groupRepository, 'create').mockReturnValue(mockGroup);
      jest.spyOn(groupRepository, 'save').mockResolvedValue(mockGroup);

      const result = await service.create(createGroupDto);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: createGroupDto.creatorId },
      });
      expect(groupRepository.create).toHaveBeenCalledWith({
        ...createGroupDto,
        members: [mockUser],
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(groupRepository.save).toHaveBeenCalledWith(mockGroup);
      expect(result).toEqual(mockGroup);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createGroupDto: CreateGroupDto = {
        name: 'Test Group',
        creatorId: '123e4567-e89b-12d3-a456-426614174000',
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createGroupDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
