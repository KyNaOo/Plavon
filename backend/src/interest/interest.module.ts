import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';

@Module({
  controllers: [InterestController],
  providers: [InterestService],
  exports: [InterestService],
  imports: [TypeOrmModule.forFeature([Interest])],
})
export class InterestModule {}
