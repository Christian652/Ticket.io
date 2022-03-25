import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { EventService } from 'src/event/event.service';
import { TicketSaleService } from '../ticketSale.service';

@Injectable()
export class TicketSoldOutPipe implements PipeTransform {
  constructor(
    private service: TicketSaleService,
    private eventService: EventService,
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { event } = value;

    const reloadedEvent = await this.eventService.getOne(event.id);
    const foundTicket = await this.service.getAll({ event });

    if (foundTicket.length >= reloadedEvent.ticket_limit)
      throw new HttpException(`Ingressos Esgotados!`, HttpStatus.BAD_REQUEST);

    return value;
  }
}
