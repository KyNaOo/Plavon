import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Plavon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'string' })
  @Column({
    type: 'varchar',
    length: 7,
    transformer: {
      from(value: string): string {
        if (value && !/^#[0-9A-F]{6}$/i.test(value)) {
          throw new Error('Invalid color format. Hexadecimal color expected');
        }
        return value;
      },
      to(value: string): string {
        return value;
      },
    },
  })
  color: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => Group, (group) => group.plavons)
  @JoinColumn({ name: 'group_id', referencedColumnName: 'id' })
  group: Group;

  @ManyToOne(() => User, (user) => user.createdPlavons)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: User;

  @ManyToMany(() => User, (user) => user.joinedPlavons)
  @JoinTable({
    name: 'plavon_participants',
    joinColumn: { name: 'plavon_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  participants: User[];
}
