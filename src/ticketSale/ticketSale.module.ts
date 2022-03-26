import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EventModule } from 'src/event/event.module';
import { EventRepository } from 'src/event/event.repository';
import { EventService } from 'src/event/event.service';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { TicketSaleController } from './ticketSale.controller';
import { TicketSaleRepository } from './ticketSale.repository';
import { TicketSaleService } from './ticketSale.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketSaleRepository, EventRepository, UserRepository]),
    AuthModule, EventModule
  ], 
  controllers: [TicketSaleController],
  providers: [TicketSaleService, EventService, UserService]
})
export class TicketSaleModule {}
