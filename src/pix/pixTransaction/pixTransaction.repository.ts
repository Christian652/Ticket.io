import { Repository, EntityRepository } from 'typeorm';
import { PixTransaction } from './pixTransaction.entity';
import { PixTransactionDTO } from './dto/pixTransaction.dto';
import { GetPixTransactionFilterDTO } from './dto/getPixTransactions.filter.dto';

@EntityRepository(PixTransaction)
export class PixTransactionRepository extends Repository<PixTransaction> {

  public async savePixTransaction(
    dto: PixTransactionDTO,
  ): Promise<PixTransaction> {
    const {
      id, title
    } = dto;

    const instance = this.create();
    instance.id = id !== null ? id : null;
    instance.title = title;

    return await instance.save();
  }

  public async getAll(parameters: GetPixTransactionFilterDTO) {
    const { sort, event, user, company, like } = parameters;

    const query = this.createQueryBuilder('pix');
    query.innerJoinAndSelect('pix.event', 'pix_event');
    query.innerJoinAndSelect('pix_event.company', 'pix_event_company');
    query.innerJoinAndSelect('pix_event.ticket_sales', 'pix_event_tickets');
    query.innerJoinAndSelect('pix_event_tickets.user', 'pix_event_tickets_user');

    if (like) {
      query.orWhere(
        'pix.title LIKE :like',
        { like: `%${like}%` }
      );
    }

    if (sort) {
      query.orderBy('id', sort);
    } else {
      query.orderBy('id', 'DESC')
    }
    let result = await query.getMany();

    if (event)
      result = result.filter(item => item.event == event);
    if (user)
      result = result.filter(item => {
        const founded = item.event.ticket_sales.find(sale => sale.user.id == user.id);

        return !!founded;
      });
    if (company)
      result = result.filter(item => item.event.company == company);

    return result;
  }
}