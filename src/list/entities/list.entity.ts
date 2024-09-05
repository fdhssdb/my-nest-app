import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Relation
} from 'typeorm';
import { Medicine } from 'src/medicine/entities/medicine.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pic: string;

  @Column()
  price: number;

  @Column()
  amount: number;

  @Column()
  desc: string;

  @Column()
  detail: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @ManyToOne(() => Medicine, (medicine) => medicine.id)
  medicine: Relation<Medicine>;
}
