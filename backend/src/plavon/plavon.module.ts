import { Module } from '@nestjs/common';
import { PlavonService } from './plavon.service';
import { PlavonController } from './plavon.controller';
import { Group } from '../groups/entities/group.entity';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plavon } from './entities/plavon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, Plavon])],
  controllers: [PlavonController],
  providers: [PlavonService],
  exports: [PlavonService],
})
export class PlavonModule {}
