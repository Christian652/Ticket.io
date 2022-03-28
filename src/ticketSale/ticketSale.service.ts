import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketSale } from './ticketSale.entity';
import { TicketSaleDTO } from './dto/ticketSale.dto';
import { TicketSaleRepository } from './ticketSale.repository';
import { GetTicketSaleFilterDTO } from './dto/getTicketSales.filter.dto';
import { Role } from 'src/auth/enums/role.enum';
import { User } from 'src/user/user.entity';
import { PixService } from 'src/pix/pix.service';
import { getRepository } from 'typeorm';
import { Event } from 'src/event/event.entity';

@Injectable()
export class TicketSaleService {
  private readonly logger = new Logger(TicketSaleService.name);

  constructor(
    @InjectRepository(TicketSaleRepository)
    private repository: TicketSaleRepository,
  ) { }

  public async save(dto: TicketSaleDTO): Promise<any> {
    try {
      const { user, event } = dto;

      const foundTicket = await this.getAll({ user, event });
      
      if (foundTicket.length > 0)
        throw new HttpException(`Você já tem Ingresso Comprado Nesse Evento!`, HttpStatus.BAD_REQUEST);
  
      return await this.repository.saveTicketSale(dto);
      
      // const qrCodeBuffer = await this.pixService.getQrCodeCharge(reloadedEvent);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(
    parameters: GetTicketSaleFilterDTO,
    user?: User
  ): Promise<TicketSale[]> {
    if (user?.role == Role.Expectator)
      parameters.user = user

    return await this.repository.getAll(parameters);
  }

  public async getOne(id: number, user?: User): Promise<TicketSale> {
    const foundTicketSale = await this.repository.findOne(id);

    if (!foundTicketSale)
      throw new NotFoundException(`Não Existe Ingresso Com o Id: ${id}`);

    if (
      user.role == Role.Expectator &&
      foundTicketSale.user !== user
    ) throw new NotFoundException(`Esse Ingresso Não Pertence a Você!: ${id}`);
    return foundTicketSale;
  }
}