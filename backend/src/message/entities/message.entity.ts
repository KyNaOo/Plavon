import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  content: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => Group, (group) => group.messages)
  @JoinColumn({ name: 'id_group' })
  group: Group;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'id_user' })
  user: User;
}
