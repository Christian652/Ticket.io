
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, OneToMany, ManyToMany, UpdateDateColumn, ManyToOne} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
import { Company } from 'src/company/company.entity';
import { TicketSale } from 'src/ticketSale/ticketSale.entity';


@Entity({name: "users"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column()
  role: Role;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToOne(
    () => Company,
    company => company.users,
    { nullable: false }
  )
  company: Company;

  @OneToMany(
    () => TicketSale,
    ticket => ticket.user
  )
  ticket_sales: TicketSale[];
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  async validatePassword(password: string) {
    return await bcrypt.compare(password,  this.password);
  }

 
}