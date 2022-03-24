import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: "events" })
export class Event extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column({ length: 255, nullable: false })
  thumb: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'integer', nullable: false })
  ticket_limit: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  ticket_price: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  status: boolean;

  @Column({ type: 'timestamp', nullable: false, default: () => "CURRENT_TIMESTAMP" })
  start_at: Date;

  @Column({ type: 'timestamp', nullable: false, default: () => "CURRENT_TIMESTAMP" })
  end_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}