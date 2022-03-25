import { EventModule } from './event/event.module';
import { Module } from '@nestjs/common';
import { configService } from './config/orm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { PlaceModule } from './place/place.module';
import { CompanyModule } from './company/company.module';
import { TicketSaleModule } from './ticketSale/ticketSale.module';
import { PixTransactionModule } from './pix/pixTransaction/pixTransaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmData()),
    UserModule, AuthModule, EventModule, CategoryModule, CompanyModule,
    PlaceModule, TicketSaleModule, PixTransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


