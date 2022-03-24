import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { TicketSaleController } from './ticketSale.controller';
import { TicketSaleRepository } from './ticketSale.repository';
import { TicketSaleService } from './ticketSale.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketSaleRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [TicketSaleController],
  providers: [TicketSaleService, UserService]
})
export class TicketSaleModule {}
