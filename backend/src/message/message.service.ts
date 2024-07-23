import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { User } from '../user/entities/user.entity';
import { Group } from '../groups/entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  private logger = new Logger(MessageService.name);

  /**
   * Constructs a new instance of the class.
   *
   * @param {Repository<User>} userRepository - The repository for the User entity.
   * @param {Repository<Message>} messageRepository - The repository for the Message entity.
   * @param {Repository<Group>} groupRepository - The repository for the Group entity.
   */
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Group) private groupRepository: Repository<Group>,
  ) {}

  /**
   * Create a new message in the system.
   *
   * @param {CreateMessageDto} data - The data for creating the message.
   * @return {Promise<{ groupId: string; message: Message }>} The created message along with its group id.
   */
  async create(
    data: CreateMessageDto,
  ): Promise<{ groupId: string; message: Message }> {
    try {
      const [group, author] = await Promise.all([
        this.groupRepository.findOneBy({ id: data.groupId }),
        this.userRepository.findOneBy({ id: data.authorId }),
      ]);

      if (!group) {
        throw new NotFoundException(`Group with id ${data.groupId} not found`);
      }

      if (!author) {
        throw new NotFoundException(`User with id ${data.authorId} not found`);
      }

      const newMessage = this.messageRepository.create({
        ...data,
        group,
        author,
      });

      author.messages.push(newMessage);
      group.messages.push(newMessage);

      await Promise.all([
        this.userRepository.save(author),
        this.groupRepository.save(group),
        this.messageRepository.save(newMessage),
      ]);

      return { groupId: group.id, message: newMessage };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      if (error.name == 'QueryFailedError') {
        throw new BadRequestException('Invalid input data');
      }

      this.logger.error('Error creating message:', error.stack);

      throw new InternalServerErrorException(
        'An error occurred while creating message',
      );
    }
  }

  /**
   * Retrieves a paginated list of messages based on the provided options.
   *
   * @param {Object} options - The options for retrieving messages.
   * @param {number} [options.page=1] - The page number of the results.
   * @param {number} [options.limit=10] - The maximum number of messages per page.
   * @param {string} [options.orderBy='createdAt'] - The field to order the messages by.
   * @param {('ASC' | 'DESC')} [options.order='DESC'] - The order direction of the messages.
   * @param {string[]} [options.relations=[]] - The relations to include in the messages.
   * @return {Promise<{ data: Message[], meta: { total: number, page: number, limit: number, totalPages: number } }>} - A promise that resolves to an object containing the messages and metadata.
   * @throws {InternalServerErrorException} - If an error occurs while fetching the messages.
   */
  async findAll(
    options: {
      page?: number;
      limit?: number;
      orderBy?: string;
      order?: 'ASC' | 'DESC';
      relations?: string[];
    } = {},
  ) {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      order = 'DESC',
      relations = [],
    } = options; // Destructure the options object into individual properties and set defaults if needed.

    try {
      const [messages, total] = await this.messageRepository.findAndCount({
        relations: relations,
        order: { [orderBy]: order },
        take: limit,
        skip: (page - 1) * limit,
      });

      return {
        data: messages,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching messages',
      );
    }
  }

  /**
   * Finds and returns a message by its ID.
   *
   * @param {string} id - The ID of the message to find.
   * @return {Promise<Message>} A promise that resolves to the found message, or rejects with an error.
   * @throws {InternalServerErrorException} If an error occurs while fetching the message.
   */
  async findOne(id: string) {
    try {
      const message = await this.messageRepository.findOneBy({ id });

      if (!message) {
        throw new NotFoundException(`Message with id ${id} not found`);
      }

      return message;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error('Error fetching message:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching message',
      );
    }
  }

  async update(
    data: UpdateMessageDto,
  ): Promise<{ groupId: string; message: Message }> {
    try {
      let message = await this.messageRepository.findOne({
        where: { id: data.id },
        relations: { group: true },
      });

      if (!message) {
        throw new NotFoundException(`Message with id ${data.id} not found`);
      }

      Object.assign(message, data);
      const groupId = message.group.id;
      message = await this.messageRepository.save(message);

      return { groupId, message };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error('Error updating message:', error);
      throw new InternalServerErrorException(
        'An error occurred while updating message',
      );
    }
  }

  /**
   * A function to remove a message by its ID.
   *
   * @param {string} id - The ID of the message to remove.
   * @return {Promise<{ groupId: string, message: Message }>} The ID of the group and the removed message.
   */
  async remove(id: string): Promise<{ groupId: string; message: Message }> {
    try {
      let message: Message | null = await this.messageRepository.findOne({
        where: { id },
        relations: { group: true },
      });

      if (!message) {
        throw new NotFoundException(`Message with id ${id} not found`);
      }

      const groupId: string = message.group.id;
      message.content = 'Message deleted';

      message = await this.messageRepository.save(message);

      if (!message) {
        throw new InternalServerErrorException(
          'Failed to delete message content',
        );
      }

      return { groupId, message };
    } catch (error) {
      this.logger.error('Error deleting message:', error);
      throw new InternalServerErrorException(
        'An error occurred while deleting message',
      );
    }
  }
}
