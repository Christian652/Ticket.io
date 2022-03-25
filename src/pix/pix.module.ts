import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixService } from './pix.service';
import { PixTransactionRepository } from './pixTransaction/pixTransaction.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PixTransactionRepository]),
  ], 
  controllers: [],
  providers: [PixService]
})
export class PixTransactionModule {}
