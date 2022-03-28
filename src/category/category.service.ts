import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryDTO } from './dto/category.dto';
import { CategoryRepository } from './category.repository';
import { GetCategoryFilterDTO } from './dto/getCategories.filter.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  
  constructor(
    @InjectRepository(CategoryRepository)
    private repository: CategoryRepository,
  ) { }

  public async save(
    dto: CategoryDTO,
  ): Promise<Category> {
    try {
      return await this.repository.saveCategory(dto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetCategoryFilterDTO): Promise<Category[]> {
    return await this.repository.getAll(parameters);
  }

  public async getOne(id: number): Promise<Category> {

    const foundCategory = await this.repository.findOne(id);
    if (!foundCategory) {
      this.logger.warn(` Can't Found Category With Id : ${id} `);
      throw new NotFoundException(`Não Existe Categoria Com o Id: ${id}`);
    }
    return foundCategory;
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.repository.disable(id);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}