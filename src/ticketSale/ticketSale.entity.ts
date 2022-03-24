import { Event } from 'src/event/event.entity';
import { User } from 'src/user/user.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity({ name: "ticket_sales" })
export class TicketSale extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: "CURRENT_TIMESTAMP" , nullable: false })
  selled_at: Date;

  @Column({ type: 'timestamp', default: "CURRENT_TIMESTAMP" , nullable: false })
  payed_back_at: Date;
  
  @ManyToOne(
    () => User,
    user => user.ticket_sales,
    { nullable: true}
  )
  user: User;

  @ManyToOne(
    () => Event,
    event => event.ticket_sales,
    { nullable: true}
  )
  event: Event;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}