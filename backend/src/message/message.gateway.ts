import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageIdDto } from './dto/message-id.dto';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger(MessageGateway.name);

  constructor(private readonly messageService: MessageService) {}

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    const { sockets } = this.server.sockets;
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    const { sockets } = this.server.sockets;
    this.logger.log(`Client id: ${client.id} disconnected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  @SubscribeMessage('createMessage')
  /**
   * Creates a new message using the provided data and emits an event to notify
   * all clients in the specified group that a new message has been created.
   *
   * @param {CreateMessageDto} data - The data used to create the message.
   * @return {Promise<void>} A promise that resolves when the message has been created
   * and the event has been emitted.
   */
  async create(@MessageBody() data: CreateMessageDto) {
    const { groupId, message } = await this.messageService.create(data);

    this.server.of(groupId).emit('messageCreated', message);
  }

  @SubscribeMessage('findAllMessage')
  findAll(@ConnectedSocket() client: Socket) {
    const messages = this.messageService.findAll();

    client.emit('allMessages', messages);
  }

  @SubscribeMessage('findOneMessage')
  findOne(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MessageIdDto,
  ) {
    const message = this.messageService.findOne(data.id);
    client.emit('message', message);
  }

  @SubscribeMessage('updateMessage')
  async update(@MessageBody() data: UpdateMessageDto) {
    const { groupId, message } = await this.messageService.update(data);

    this.server.of(groupId).emit('messageUpdated', message);
  }

  @SubscribeMessage('removeMessage')
  async remove(@MessageBody() data: MessageIdDto) {
    const { groupId, message } = await this.messageService.remove(data.id);

    this.server.of(groupId).emit('messageRemoved', message);
  }
}
