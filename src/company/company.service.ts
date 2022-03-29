import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyDTO } from './dto/company.dto';
import { CompanyRepository } from './company.repository';
import { GetCompanyFilterDTO } from './dto/getCompanies.filter.dto';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);
  
  constructor(
    @InjectRepository(CompanyRepository)
    private repository: CompanyRepository,
  ) { }

  public async save(
    dto: CompanyDTO,
  ): Promise<Company> {
    try {
      return await this.repository.saveCompany(dto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetCompanyFilterDTO): Promise<Company[]> {
    return await this.repository.getAll(parameters);
  }

  public async getOne(id: number): Promise<Company> {

    const foundCompany = await this.repository.findOne({
      where: { id },
      relations: ['events']
    });
    if (!foundCompany) {
      this.logger.warn(` Can't Found Company With Id : ${id} `);
      throw new NotFoundException(`Não Existe Empresa Com o Id: ${id}`);
    }
    return foundCompany;
  }

  public async delete(id: number): Promise<void> {
    try {
      const reloaded = await this.getOne(id);
      if (reloaded?.events) {
        reloaded.events.forEach(event => {
          event.status = false;
          event.save();
        })
      }

      if (reloaded?.users) {
        reloaded.users.forEach(user => {
          user.status = false;
          user.save();
        })
      }

      await this.repository.disable(id);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}