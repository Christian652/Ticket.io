import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { TicketSaleService } from '../ticketSale.service';

@Injectable()
export class UserHasBuyedPipe implements PipeTransform {
  constructor(
    private service: TicketSaleService,
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { user, event } = value;

    const foundTicket = await this.service.getAll({ user, event });

    if (foundTicket)
      throw new HttpException(`Você já tem Ingresso Comprado Nesse Evento!`, HttpStatus.BAD_REQUEST);

    return value;
  }
}
