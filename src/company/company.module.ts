import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [CompanyController],
  providers: [CompanyService, UserService]
})
export class CompanyModule {}
