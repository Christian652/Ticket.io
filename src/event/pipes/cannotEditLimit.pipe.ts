import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { Place } from 'src/place/place.entity';
import { getBrlFormatedDateTime } from 'src/utils/date';
import { getRepository } from 'typeorm';
import { EventService } from '../event.service';

@Injectable()
export class CannotEditLimitPipe implements PipeTransform {
  constructor(
    private service: EventService,
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { id } = value;
    
    const foundEvent = await this.service.getOne(+id);
    const tickets = foundEvent.ticket_sales;
    
    if (tickets.length >= foundEvent.ticket_limit) 
      throw new HttpException(`O Limite de Ingressos Definido Inicialmente Já Foi Vendido , não Se Pode Reduzir Apenas Aumentar!`, HttpStatus.BAD_REQUEST);
      
    return value;
  }
}
