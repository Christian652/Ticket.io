import { Category } from 'src/category/category.entity';
import { Company } from 'src/company/company.entity';
import { Place } from 'src/place/place.entity';
import { TicketSale } from 'src/ticketSale/ticketSale.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';

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

  @ManyToOne(
    () => Company,
    company => company.events,
    { nullable: false, cascade: true, onDelete: 'SET NULL' }
  )
  company: Company;

  @ManyToOne(
    () => Place,
    place => place.events,
    { nullable: false, cascade: true, onDelete: 'SET NULL' }
  )
  place: Place;

  @ManyToMany(
    () => Category,
    category => category.events,
    { nullable: true, cascade: true, onDelete: 'SET NULL' }
  )
  categories: Category[];

  @OneToMany(
    () => TicketSale,
    ticket => ticket.event
  )
  ticket_sales: TicketSale[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}