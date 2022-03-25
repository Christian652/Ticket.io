import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PixTransaction } from './pixTransaction.entity';
import { PixTransactionDTO } from './dto/pixTransaction.dto';
import { PixTransactionRepository } from './pixTransaction.repository';
import { GetPixTransactionFilterDTO } from './dto/getPixTransactions.filter.dto';

@Injectable()
export class PixTransactionService {
  private readonly logger = new Logger(PixTransactionService.name);
  
  constructor(
    @InjectRepository(PixTransactionRepository)
    private repository: PixTransactionRepository,
  ) { }

  public async save(
    dto: PixTransactionDTO,
  ): Promise<PixTransaction> {
    try {
      return await this.repository.savePixTransaction(dto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetPixTransactionFilterDTO): Promise<PixTransaction[]> {
    return await this.repository.getAll(parameters);
  }

  public async getOne(id: number): Promise<PixTransaction> {

    const foundPixTransaction = await this.repository.findOne(id);
    if (!foundPixTransaction) {
      this.logger.warn(` Can't Found PixTransaction With Id : ${id} `);
      throw new NotFoundException(`Não Existe Produto Com o Id: ${id}`);
    }
    return foundPixTransaction;
  }

}