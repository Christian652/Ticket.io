import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository, UserRepository]),
    AuthModule
  ], 
  controllers: [CategoryController],
  providers: [CategoryService, UserService]
})
export class CategoryModule {}
