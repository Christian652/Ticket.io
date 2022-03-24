import { Repository, EntityRepository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyDTO } from './dto/company.dto';
import { GetCompanyFilterDTO } from './dto/getCompanies.filter.dto';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {

  public async saveCompany(
    dto: CompanyDTO,
  ): Promise<Company> {
    const {
      id, name, owner_name, cnpj, status, pix_key, pix_key_type
    } = dto;

    const instance = this.create();
    instance.id = id !== null ? id : null;
    instance.name = name;
    instance.owner_name = owner_name;
    instance.cnpj = cnpj;
    instance.pix_key = pix_key;
    instance.pix_key_type = pix_key_type;
    instance.status = status == false ? false : true;
    
    return await instance.save();
  }

  public async getAll(parameters: GetCompanyFilterDTO) {
    const { sort, like } = parameters;

    const query = this.createQueryBuilder('companys');

    if (like)
      query.andWhere(
        'companys.name LIKE :like',
        { like: `%${like}%` }
      );

    if (sort) {
      query.orderBy('id', sort);
    } else {
      query.orderBy('id', 'ASC')
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