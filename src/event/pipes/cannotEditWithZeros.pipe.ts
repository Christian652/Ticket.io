import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { EventService } from '../event.service';

@Injectable()
export class CannotEditWithZerosPipe implements PipeTransform {
  constructor(
    private service: EventService,
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { ticket_limit, ticket_price } = value;
    
    if (+ticket_limit <= 0 || +ticket_price <= 0) {}
      throw new HttpException(`O Limite de Ingressos e o Valor de Ingresso não podem ser 0 ou negativo!`, HttpStatus.BAD_REQUEST);
      
    return value;
  }
}
