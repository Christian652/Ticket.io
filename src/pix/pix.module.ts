import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from 'src/event/event.module';
import { PixService } from './pix.service';
import { PixTransactionRepository } from './pixTransaction/pixTransaction.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixTransactionRepository])
  ], 
  controllers: [],
  providers: [PixService],
  exports: [PixService]
})
export class PixModule {}
