import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { RenameGroupDto } from './dto/rename-group.dto';
import { JoinGroupDto } from './dto/join-group.dto';
import { Logger } from '@nestjs/common';
import { LeaveGroupDto } from './dto/leave-group.dto';
import { GetUserGroupsDto } from './dto/get-user-groups.dto';
import { GroupIdDto } from './dto/group-id.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GroupsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(GroupsGateway.name);

  @WebSocketServer()
  private readonly server: Server;

  constructor(private readonly groupsService: GroupsService) {}

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket) {
    const { sockets } = this.server.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  handleError(client: Socket, error: Error) {
    this.logger.error(error);
    client.emit('groupError', { error });
  }

  @SubscribeMessage('createGroup')
  async handleCreateGroup(client: Socket, data: CreateGroupDto) {
    try {
      const group = this.groupsService.create(data);
      client.emit('groupCreated', group);
    } catch (error) {
      this.handleError(client, error);
    }
  }

  @SubscribeMessage('joinGroup')
  async handleJoinGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: JoinGroupDto,
  ) {
    try {
      const group = await this.groupsService.joinGroup(data);
      client.join(group.id);
    } catch (error) {
      this.handleError(client, error);
    }
  }

  @SubscribeMessage('leaveGroup')
  async handleLeaveGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: LeaveGroupDto,
  ) {
    try {
      const group = await this.groupsService.leaveGroup(data);
      client.leave(group.id);
    } catch (error) {
      this.handleError(client, error);
    }
  }

  @SubscribeMessage('getAllGroups')
  async handleAllGroups(@ConnectedSocket() client: Socket) {
    try {
      const groups = await this.groupsService.findAll();
      client.emit('allGroups', groups);
    } catch (error) {
      this.handleError(client, error);
    }
  }

  @SubscribeMessage('getGroup')
  async handleGetGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: GroupIdDto,
  ) {
    try {
      const group = await this.groupsService.findOne(data.id);
      client.emit('group', group);
    } catch (error) {
      this.handleError(client, error);
    }
  }

  @SubscribeMessage('getUserGroups')
  async handleGetUserGroups(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: GetUserGroupsDto,
  ) {
    try {
      const groups = await this.groupsService.findByUser(data.userId);
      client.emit('userGroups', groups);
    } catch (error) {
      this.handleError(client, error);
    }
  }

  @SubscribeMessage('renameGroup')
  async handleUpdateGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: RenameGroupDto,
  ) {
    try {
      const group = await this.groupsService.rename(data);
      client.emit('groupRenamed', group);
    } catch (error) {
      this.handleError(client, error);
    }
  }

  @SubscribeMessage('deleteGroup')
  async handleDeleteGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: GroupIdDto,
  ) {
    try {
      const group = await this.groupsService.remove(data.id);
      client.emit('groupDeleted', group);
    } catch (error) {
      this.handleError(client, error);
    }
  }
}
