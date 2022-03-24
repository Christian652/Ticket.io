
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, CreateDateColumn, OneToMany, ManyToMany, UpdateDateColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';


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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
  async validatePassword(password: string) {
    return await bcrypt.compare(password,  this.password);
  }

 
}