import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [EventController],
  providers: [EventService, UserService]
})
export class EventModule {}
