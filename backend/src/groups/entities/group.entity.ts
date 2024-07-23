import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable({
    name: 'group_members',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  members: User[];

  @Column('uuid')
  creatorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
