import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
  Patch
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';
import { Category } from './category.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetCategoryFilterDTO } from './dto/getCategories.filter.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('categories')
export class CategoryController {
  constructor(
    private service: CategoryService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(ValidationPipe)
  public async create(
    @Body() dto: CategoryDTO
  ): Promise<Category> {
    try {
      return await this.service.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  @Roles(Role.Admin)
  @UsePipes(ValidationPipe)
  public async update(
    @Body() dto: CategoryDTO
  ): Promise<Category> {
    try {
      return await this.service.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getAll(@Query() parameters: GetCategoryFilterDTO): Promise<Category[]> {
    try {
      return await this.service.getAll(parameters);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return await this.service.getOne(id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.service.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}