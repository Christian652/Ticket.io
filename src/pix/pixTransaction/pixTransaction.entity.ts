import { Event } from 'src/event/event.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: "pix_transactions" })
export class PixTransaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @ManyToOne(
    () => Event,
    event => event.pix_transactions
  )
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}