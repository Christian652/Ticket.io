import { Injectable, Logger } from '@nestjs/common';
import { PayBackDto } from './dto/PayBack.dto';
import { PixTransaction } from './pixTransaction/pixTransaction.entity';
import { Cron } from '@nestjs/schedule';
import { EventService } from 'src/event/event.service';
import { PixKeyTypes } from 'src/company/enums/pixKeyTypes.enum';
import { TicketSale } from 'src/ticketSale/ticketSale.entity';
import { Event } from 'src/event/event.entity';
import { getRepository, MoreThanOrEqual } from 'typeorm';
import { getToday } from 'src/utils/date';
import { GNRequest } from './apis/gerencianet';

@Injectable()
export class PixService {
  private readonly logger = new Logger(PixService.name);

  async payBack(ticket: TicketSale): Promise<any> {
    if (!ticket.payed_back_at) {
      const valueToPayBack = ticket.event.ticket_price;
      const pixKey = ticket.user.pix_key;

      // disparar função de enviar o pix para a chave desse cara
      // usando a chave dele

      ticket.payed_back_at = new Date();
      return await ticket.save();
    }
  }

  async getQrCodeCharge(event: Event) {
    const price = event.ticket_price.toString();
    const key = event.company.pix_key;

    const reqGNAlready = GNRequest({
      clientID: process.env.GN_CLIENT_ID,
      clientSecret: process.env.GN_CLIENT_SECRET
    });
    const reqGN = await reqGNAlready;

    const dataCob = {
      calendario: {
        expiracao: 3600 * 3
      },
      valor: {
        original: price
      },
      chave: key,
      solicitacaoPagador: `Cobrança de Ingresso do Evento ${event.title}`
    };

    const cobResponse = await reqGN.post('/v2/cob', dataCob);
    const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);
    const qrCodeBuffer = qrcodeResponse.data.imagemQrcode;

    return qrCodeBuffer;
  }

  // @Cron("* * * * * *")
  async autoPayback() {
    const date = getToday({
      formated: true, withTime: true
    });

    const expiredEvents = await getRepository(Event).find({
      where: {
        status: false,
        end_at: MoreThanOrEqual(date),
        relations: ['ticket_sales']
      }
    });

    expiredEvents.forEach(event => {
      const ticketsToPay = event.ticket_sales;

      ticketsToPay.forEach(this.payBack)
    })
  }

}