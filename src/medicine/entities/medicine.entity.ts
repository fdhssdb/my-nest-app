import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { List } from 'src/list/entities/list.entity';
@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column()
  pic: string;

  @Column()
  desc: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @OneToMany(() => List, (list) => list.id)
  list: List[];
}
