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
import { CompanyService } from './company.service';
import { CompanyDTO } from './dto/company.dto';
import { Company } from './company.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetCompanyFilterDTO } from './dto/getCompanies.filter.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('companies')
export class CompanyController {
  constructor(
    private service: CompanyService
  ) { }

  @Post()
  @Roles(Role.Admin)
  @UsePipes(ValidationPipe)
  public async create(
    @Body() dto: CompanyDTO
  ): Promise<Company> {
    try {
      return await this.service.save(dto);
    } catch (error) {
      if (error instanceof HttpException)
        throw error;
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  @Roles(Role.Company, Role.Admin)
  @UsePipes(ValidationPipe)
  public async update(
    @Body() dto: CompanyDTO
  ): Promise<Company> {
    try {
      return await this.service.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getAll(@Query() parameters: GetCompanyFilterDTO): Promise<Company[]> {
    try {
      return await this.service.getAll(parameters);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @Roles(Role.Company, Role.Expectator, Role.Receptionist)
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return await this.service.getOne(id);
  }

  @Delete(':id')
  @Roles(Role.Company, Role.Admin)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.service.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}