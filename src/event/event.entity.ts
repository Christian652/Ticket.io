import { Category } from 'src/category/category.entity';
import { Company } from 'src/company/company.entity';
import { PixTransaction } from 'src/pix/pixTransaction/pixTransaction.entity';
import { Place } from 'src/place/place.entity';
import { TicketSale } from 'src/ticketSale/ticketSale.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

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
    company => company.events
  )
  company: Company;

  @ManyToOne(
    () => Place,
    place => place.events
  )
  place: Place;

  @JoinTable()
  @ManyToMany(
    () => Category,
    category => category.events,
    { nullable: true }
  )
  categories: Category[];

  @OneToMany(
    () => TicketSale,
    ticket => ticket.event
  )
  ticket_sales: TicketSale[];

  @OneToMany(
    () => PixTransaction,
    transaction => transaction.event
  )
  pix_transactions: PixTransaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}