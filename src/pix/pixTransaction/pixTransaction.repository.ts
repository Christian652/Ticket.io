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
    const { sort, like } = parameters;

    const query = this.createQueryBuilder('pixTransactions');

    if (like) {
      query.orWhere(
        'pixTransactions.title LIKE :like',
        { like: `%${like}%` }
      );
    }
      
    if (sort) {
      query.orderBy('id', sort);
    } else {
      query.orderBy('id', 'DESC')
    }
    return await query.getMany();
  }
}