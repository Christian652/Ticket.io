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

    const foundCompany = await this.repository.findOne(id);
    if (!foundCompany) {
      this.logger.warn(` Can't Found Company With Id : ${id} `);
      throw new NotFoundException(`Não Existe Empresa Com o Id: ${id}`);
    }
    return foundCompany;
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.repository.disable(id);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}