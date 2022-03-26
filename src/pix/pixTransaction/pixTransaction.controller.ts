import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
  Query
} from '@nestjs/common';
import { PixTransactionService } from './pixTransaction.service';
import { PixTransaction } from './pixTransaction.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetPixTransactionFilterDTO } from './dto/getPixTransactions.filter.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('pix-transactions')
export class PixTransactionController {
  constructor(
    private service: PixTransactionService
  ) { }

  @Get()
  @Roles(Role.Admin, Role.Company, Role.Expectator)
  public async getAll(@Query() parameters: GetPixTransactionFilterDTO): Promise<PixTransaction[]> {
    try {
      return await this.service.getAll(parameters);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}