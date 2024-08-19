import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { NotificationGateway } from './notification.gateway';

@Processor('userNotifications')
/**
 * Consumer class for the 'userNotifications' queue.
 *
 * Processes the notifications in the queue and sends it to the right user.
 */
export class UserNotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(UserNotificationProcessor.name);

  constructor(private notificationGateway: NotificationGateway) {
    super();
  }

  async process(job: Job, token?: string) {
    const { userId, message } = job.data;
    this.logger.log(`Sending notification to user ${userId}: ${message}`);
    this.notificationGateway.sendUserNotification(userId, message);
  }
}

@Processor('groupNotifications')
/**
 * Consumer class for the groupNotifications queue.
 *
 * Processes the notifications in the queue and sends it to the members of the group.
 */
export class GroupNotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(GroupNotificationProcessor.name);

  constructor(private notificationGateway: NotificationGateway) {
    super();
  }

  async process(job: Job, token?: string) {
    const { groupId, message } = job.data;
    this.logger.log(`Sending notification to group${groupId}: ${message}`);
    this.notificationGateway.sendGroupNotification(groupId, message);
  }
}
