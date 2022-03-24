import { Event } from 'src/event/event.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

@Entity({ name: "categories" })
export class Category extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  status: boolean;

  @ManyToMany(
    () => Event,
    events => events.categories,
    { nullable: true, cascade: false }
  )
  events: Event[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}