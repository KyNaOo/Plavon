import { Module } from '@nestjs/common';
import { PlavonService } from './plavon.service';
import { PlavonController } from './plavon.controller';
import { Group } from '../groups/entities/group.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  controllers: [PlavonController],
  providers: [PlavonService],
})
export class PlavonModule { }
