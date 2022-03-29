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
    
      const rawexpectadorpassword = 'expectador';
      const expectadorpassword = await bcrypt.hash(rawexpectadorpassword, salt);
    
      return await this.userRepository.insertMany([
        {
          name: 'admin user',
          email: 'admin@gmail.com',
          status: true,
          role: Role.Admin,
          password: adminpassword,
        },
        {
          name: 'joão expectador',
          email: 'joão@gmail.com',
          status: true,
          role: Role.Expectator,
          password: expectadorpassword,
        },
        {
          name: 'marcos expectador',
          email: 'marcos@gmail.com',
          status: true,
          role: Role.Expectator,
          password: expectadorpassword,
        },
        {
          name: 'lucas expectador',
          email: 'lucas@gmail.com',
          status: true,
          role: Role.Expectator,
          password: expectadorpassword,
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