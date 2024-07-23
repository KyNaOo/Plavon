import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './dto/notification.dto';

const gatewayMetadata = {
  namespace: '/notifications',
  cors: {
    origin: '*',
  },
};

@WebSocketGateway(gatewayMetadata)
@Injectable()
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private userSockets: Map<string, Socket[]> = new Map();

  private readonly logger = new Logger(NotificationGateway.name);

  constructor(private readonly notificationService: NotificationService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  /**
   * Handles the disconnection of a client socket.
   *
   * It removes the client socket from the userSockets map so that
   * it is no longer associated with any user.
   *
   * @param {Socket} client - The client socket that disconnected.
   * @return {void} This function does not return anything.
   */
  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.removeClientFromUser(client);
  }

  @SubscribeMessage('subscribeToUser')
  /**
   * Handles the subscription of a client socket to a user's notifications.
   *
   * @param {Socket} client - The client socket.
   * @param {string} userId - The ID of the user.
   * @return {void} This function does not return a value.
   */
  handleSubscribeToUser(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string,
  ) {
    if (!userId) {
      throw new Error('userId is required');
    }

    if (!client) {
      throw new Error('client is required');
    }

    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, []);
    }

    const userSockets = this.userSockets.get(userId);
    if (!userSockets) {
      throw new Error('Failed to retrieve user sockets');
    }

    userSockets.push(client);
    this.logger.log(`Client ${client.id} subscribed to user ${userId}`);
  }

  @SubscribeMessage('subscribeToGroup')
  /**
   * Subscribes a client to a specific group notifications.
   *
   * @param {Socket} client - The client socket to subscribe.
   * @param {string} groupId - The Group to subscribe to.
   * @return {void} This function does not return anything.
   */
  handleSubscribeToGroup(client: Socket, groupId: string) {
    client.join(groupId);
    this.logger.log(`Client ${client.id} subscribed to topic ${groupId}`);
  }

  /**
   * Iterates over userSockets to remove a specific client.
   *
   * @param {Socket} client - The client socket to be removed.
   * @return {void} This function does not return anything.
   */
  private removeClientFromUser(client: Socket) {
    for (const [userId, sockets] of this.userSockets.entries()) {
      const index = sockets.indexOf(client);
      if (index !== -1) {
        sockets.splice(index, 1);
        if (sockets.length === 0) {
          this.userSockets.delete(userId);
        }
        break;
      }
    }
  }

  /**
   * Sends a notification to all sockets associated with a given user.
   *
   * @param {string} userId - The ID of the user to send the notification to.
   * @param {string} message - The notification message to send.
   * @return {void} This function does not return a value.
   */
  sendUserNotification(userId: string, message: string) {
    const userSockets = this.userSockets.get(userId);
    if (userSockets) {
      userSockets.forEach((socket) => socket.emit('notification', message));
    }
  }

  /**
   * Sends a notification to all sockets subscribed to a specific group.
   *
   * @param {string} groupId - The group to send the notification to.
   * @param {string} message - The notification message to send.
   * @return {void} This function does not return a value.
   */
  sendGroupNotification(groupId: string, message: string) {
    this.server.to(groupId).emit('notification', message);
  }

  @SubscribeMessage('createNotification')
  /**
   * Creates a notification using the provided data.
   *
   * @param {Socket} client - The connected socket.
   * @param {CreateNotificationDto} data - The data used to create the notification.
   * @return {Promise<void>} A promise that resolves when the notification is created.
   */
  async createNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateNotificationDto,
  ) {
    await this.notificationService.createNotification(data);
  }

  @SubscribeMessage('notificationReaded')
  /**
   * Handles the event when a notification is marked as read.
   *
   * @param {Socket} client - The connected socket.
   * @param {UpdateNotificationDto} data - The data containing the notification ID to be marked as read.
   * @return {Promise<void>} A promise that resolves when the notification is marked as read.
   */
  async handleNotificationReaded(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: UpdateNotificationDto,
  ) {
    await this.notificationService.markNotificationAsRead(data.id);
  }
}
