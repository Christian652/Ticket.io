import { Repository, EntityRepository } from 'typeorm';
import { TicketSale } from './ticketSale.entity';
import { TicketSaleDTO } from './dto/ticketSale.dto';
import { GetTicketSaleFilterDTO } from './dto/getTicketSales.filter.dto';

@EntityRepository(TicketSale)
export class TicketSaleRepository extends Repository<TicketSale> {

  public async saveTicketSale(
    dto: TicketSaleDTO,
  ): Promise<TicketSale> {
    const {
      id, selled_at, payed_back_at, user, event
    } = dto;

    const instance = this.create();
    instance.id = id !== null ? id : null;
    instance.selled_at = selled_at;
    instance.payed_back_at = payed_back_at;
    instance.user = user;
    instance.event = event;
    
    return await instance.save();
  }

  public async getAll(parameters: GetTicketSaleFilterDTO) {
    const { sort } = parameters;

    const query = this.createQueryBuilder('ticketSales');

    if (sort) {
      query.orderBy('id', sort);
    } else {
      query.orderBy('id', 'ASC')
    }
    return await query.getMany();
  }
}