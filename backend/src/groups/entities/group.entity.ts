import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id_group: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.groups)
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
