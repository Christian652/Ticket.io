import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { PlaceService } from './place.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [PlaceController],
  providers: [PlaceService, UserService]
})
export class PlaceModule {}
