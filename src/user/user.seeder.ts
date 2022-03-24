import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  async seed(): Promise<any> {
    try {

      const salt = await bcrypt.genSalt(10);

      const rawadminpassword = 'admin';
      const adminpassword = await bcrypt.hash(rawadminpassword, salt);
    
      const rawreceptionistpassword = 'receptionist';
      const receptionistpassword = await bcrypt.hash(rawreceptionistpassword, salt);
    
      const rawstockerpassword = 'stocker';
      const stockerpassword = await bcrypt.hash(rawstockerpassword, salt);
    
      const rawcompanypassword = 'company';
      const companypassword = await bcrypt.hash(rawcompanypassword, salt);
    
      return await this.userRepository.insertMany([
        {
          name: 'admin user',
          email: 'admin@gmail.com',
          status: true,
          role: Role.Admin,
          password: adminpassword,
        },
        {
          name: 'receptionist user',
          email: 'receptionist@gmail.com',
          status: true,
          role: Role.Receptionist,
          password: receptionistpassword,
        },
        {
          name: 'stocker user',
          email: 'stocker@gmail.com',
          status: true,
          role: Role.Expectator,
          password: stockerpassword,
        },
        {
          name: 'company user',
          email: 'company@gmail.com',
          status: true,
          role: Role.Company,
          password: companypassword,
        },
      ]);  
    } catch (error) {
      console.log(error)
    }
  }

  async drop(): Promise<any> {
    try {
      const user = await this.userRepository.find();
      await this.userRepository.remove(user);
    } catch (error) {}
  }
}