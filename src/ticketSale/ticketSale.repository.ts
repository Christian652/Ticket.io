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
      id, payed_back_at, user, event
    } = dto;

    const instance = this.create();
    instance.id = id !== null ? id : null;
    instance.payed_back_at = payed_back_at ? payed_back_at : null;
    instance.user = user;
    instance.event = event;

    return await instance.save();
  }

  public async getAll(parameters: GetTicketSaleFilterDTO) {
    const { sort, event, user } = parameters;

    const query = this.createQueryBuilder('ticketSales');
    query.innerJoinAndSelect('ticketSales.user', 'ticketSales_user');
    query.innerJoinAndSelect('ticketSales.event', 'ticketSales_event');
    
    if (event)
      query.andWhere('ticketSales_event.id = :event', { event: event.id });

    if (user)
      query.andWhere('ticketSales_user.id = :user', { user: user.id });

    if (sort) {
      query.orderBy('ticketSales.id', sort);
    } else {
      query.orderBy('ticketSales.id', 'DESC')
    }
    return await query.getMany();
  }
}