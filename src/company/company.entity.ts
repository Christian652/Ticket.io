import { Event } from 'src/event/event.entity';
import { User } from 'src/user/user.entity';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PixKeyTypes } from './enums/pixKeyTypes.enum';

@Entity({ name: "companies" })
export class Company extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 20, nullable: false })
  cnpj: string;

  @Column({ length: 255, nullable: false })
  owner_name: string;

  @Column({ length: 255, nullable: false })
  pix_key: string;

  @Column({ length: 100, nullable: false })
  pix_key_type: PixKeyTypes;

  @Column({ type: 'boolean', nullable: false, default: true })
  status: boolean;

  @OneToMany(
    () => Event,
    event => event.company,
    { nullable: true }
  )
  events: Event[];

  @OneToMany(
    () => User,
    user => user.company,
    { nullable: true }
  )
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}