import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string; // 'user' or 'topic'

  @Column()
  recipient: string; // userId or topic (groupId)

  @Column()
  message: string;

  @Column({ nullable: true })
  metadata: string; // JSON string for additional data

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
