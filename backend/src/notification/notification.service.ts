import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Notification } from './entities/notification.entity';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './dto/notification.dto';

@Injectable()
/**
 * Job producers add jobs to queues.
 * Producers are typically application services.
 * To add jobs to a queue, first inject the queue into the service.
 */
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectQueue('userNotifications') private userQueue: Queue,
    @InjectQueue('groupNotifications') private topicQueue: Queue,
  ) {}

  async createNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    await this.notificationRepository.save(notification);

    if (notification.type === 'user') {
      await this.userQueue.add('sendNotification', { notification });
    } else if (notification.type === 'topic') {
      await this.topicQueue.add('sendNotification', { notification });
    }

    return notification;
  }

  async getNotificationsByRecipient(
    recipient: string,
  ): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { recipient } });
  }

  async markNotificationAsRead(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOneBy({ id });
    if (!notification) {
      throw new Error('Notification not found');
    }
    notification.read = true;
    return this.notificationRepository.save(notification);
  }

  async updateNotification(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.notificationRepository.findOneBy({ id });
    if (!notification) {
      throw new Error('Notification not found');
    }
    Object.assign(notification, updateNotificationDto);
    return this.notificationRepository.save(notification);
  }

  async deleteNotification(id: string): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
