import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => Group, (group) => group.messages)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: User;
}
