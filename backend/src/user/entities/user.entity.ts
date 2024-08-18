import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interest } from '../../interest/entities/interest.entity';
import { Group } from '../../groups/entities/group.entity';
import { Message } from '../../message/entities/message.entity';
import { Plavon } from '../../plavon/entities/plavon.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256 })
  firstName: string;

  @Column({ length: 256 })
  lastName: string;

  @Column({ length: 64 })
  email: string;

  @Column({ length: 64 })
  password: string;

  @Column({ length: 64 })
  bio: string;

  @ManyToMany(() => Interest)
  @JoinTable({
    name: 'user_interest',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'interest_id',
      referencedColumnName: 'id',
    },
  })
  interests: Interest[];

  @ManyToMany(() => Group, (group) => group.members)
  @JoinTable({
    name: 'user_groups',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
  })
  groups: Group[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @OneToMany(() => Plavon, (plavon) => plavon.author)
  @JoinColumn({ name: 'plavon_id', referencedColumnName: 'id' })
  plavons: Plavon[];
}
