import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { Group } from 'src/groups/entities/group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_user: number;

  @Column({ length: 256 })
  firstName: string;

  @Column({ length: 256 })
  lastName: string;

  @Column({ length: 64, unique: true })
  email: string;

  @Column({ length: 64 })
  password: string;

  @Column('text', { nullable: true })
  bio: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Group, (group) => group.members)
  groups: Group[];
}
