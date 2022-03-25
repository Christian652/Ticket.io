import { Injectable, Logger } from '@nestjs/common';
import { PayBackDto } from './dto/PayBack.dto';
import { PixTransaction } from './pixTransaction/pixTransaction.entity';

@Injectable()
export class PixService {
  private readonly logger = new Logger(PixService.name);

  async payBack(dto: PayBackDto): Promise<PixTransaction> {
    // pega os dados do dto e devolve o dinheiro pro cara com pix
    // valor é pego pelo ticket_price do event
    // a pixKey e pixKeyType vão vir em alguma request de onde o usuário ta pedindo
    // reembolso , ou então de alguma request cuja qual a empresa quer reembolsar todos
    // porque o evento foi cancelado
    return null;
  }


}