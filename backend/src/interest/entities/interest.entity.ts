import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Interest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;
}
