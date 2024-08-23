import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn } from 'typeorm';
@Entity()
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  pic: string;

  @Column()
  desc: string;

  @CreateDateColumn({type:"timestamp"})
  create_time:Date
}
