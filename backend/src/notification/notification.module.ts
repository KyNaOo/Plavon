import { Module } from '@nestjs/common';
import {
  GroupNotificationProcessor,
  UserNotificationProcessor,
} from './notification.processor'; // Consumers must be registered as providers so the @nestjs/bullmq package can pick them up.
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    BullModule.registerQueue(
      { name: 'userNotifications' },
      { name: 'groupNotifications' },
    ),
  ],
  providers: [UserNotificationProcessor, GroupNotificationProcessor],
})
export class NotificationModule {}
