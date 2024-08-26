import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Interest } from '../interest/entities/interest.entity';
import { InterestModule } from '../interest/interest.module';

@Module({
  imports: [InterestModule, TypeOrmModule.forFeature([User, Interest])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
