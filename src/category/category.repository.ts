import { Repository, EntityRepository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDTO } from './dto/category.dto';
import { GetCategoryFilterDTO } from './dto/getCategories.filter.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

  public async saveCategory(
    dto: CategoryDTO,
  ): Promise<Category> {
    const {
      id, title, status
    } = dto;

    const instance = this.create();
    instance.id = id !== null ? id : null;
    instance.title = title;
    instance.status = status == false ? false : true;
    
    return await instance.save();
  }

  public async getAll(parameters: GetCategoryFilterDTO) {
    const { sort, like } = parameters;

    const query = this.createQueryBuilder('categorys');

    if (like)
      query.andWhere(
        'categorys.name LIKE :like',
        { like: `%${like}%` }
      );

    if (sort) {
      query.orderBy('id', sort);
    } else {
      query.orderBy('id', 'DESC')
    }
    return await query.getMany();
  }

  public async disable(id: number) {
    const register = await this.findOne(id);

    if (register) {
      register.status = false;
      register.save();
    }
  }



}