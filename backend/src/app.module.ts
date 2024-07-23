import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { GroupsModule } from './groups/groups.module';
import { AuthModule } from './auth/auth.module';
import { InterestModule } from './interest/interest.module';
import { BullModule } from '@nestjs/bullmq';
import { NotificationGateway } from './notification/notification.gateway';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379'),
      },
    }),
    UserModule,
    MessageModule,
    GroupsModule,
    AuthModule,
    InterestModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationGateway, NotificationService],
})
export class AppModule {}
