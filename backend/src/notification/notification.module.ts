import { Module } from '@nestjs/common';
import {
  GroupNotificationProcessor,
  UserNotificationProcessor,
} from './notification.processor'; // Consumers must be registered as providers so the @nestjs/bullmq package can pick them up.
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { GroupsService } from '../groups/groups.service';
import { Group } from '../groups/entities/group.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, Group, User]),
    BullModule.registerQueue(
      { name: 'userNotifications' },
      { name: 'groupNotifications' },
    ),
  ],
  providers: [
    UserNotificationProcessor,
    GroupNotificationProcessor,
    NotificationService,
    NotificationGateway,
    GroupsService,
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
