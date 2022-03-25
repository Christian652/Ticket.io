import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { PixTransactionController } from './pixTransaction.controller';
import { PixTransactionRepository } from './pixTransaction.repository';
import { PixTransactionService } from './pixTransaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixTransactionRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [PixTransactionController],
  providers: [PixTransactionService, UserService]
})
export class PixTransactionModule {}
