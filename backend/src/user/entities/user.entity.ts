import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interest } from '../../interest/entities/interest.entity';

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
}
