import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketSale } from './ticketSale.entity';
import { TicketSaleDTO } from './dto/ticketSale.dto';
import { TicketSaleRepository } from './ticketSale.repository';
import { GetTicketSaleFilterDTO } from './dto/getTicketSales.filter.dto';

@Injectable()
export class TicketSaleService {
  private readonly logger = new Logger(TicketSaleService.name);
  
  constructor(
    @InjectRepository(TicketSaleRepository)
    private repository: TicketSaleRepository,
  ) { }

  public async save(dto: TicketSaleDTO): Promise<TicketSale> {
    try {
      return await this.repository.saveTicketSale(dto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetTicketSaleFilterDTO): Promise<TicketSale[]> {
    return await this.repository.getAll(parameters);
  }

  public async getOne(id: number): Promise<TicketSale> {

    const foundTicketSale = await this.repository.findOne(id);
    if (!foundTicketSale) 
      throw new NotFoundException(`Não Existe Produto Com o Id: ${id}`);
    
    return foundTicketSale;
  }
}