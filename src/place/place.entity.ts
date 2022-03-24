import { Event } from 'src/event/event.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity({ name: "places" })
export class Place extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ length: 255, nullable: false })
  city: string;

  @Column({ length: 255, nullable: false })
  street: string;

  @Column({ length: 255, nullable: false })
  cep: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  status: boolean;

  @OneToMany(
    () => Event,
    event => event.place
  )
  events: Event[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}