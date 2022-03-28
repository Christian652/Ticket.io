import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { Place } from 'src/place/place.entity';
import { getBrlFormatedDateTime } from 'src/utils/date';
import { getRepository } from 'typeorm';
import { EventService } from '../event.service';

@Injectable()
export class PlaceInUsePipe implements PipeTransform {
  constructor(
    private service: EventService,
  ) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { placeId, start_at, end_at } = value;
    
    const reloadedPlace = await getRepository(Place).findOne({
      where: { id: placeId },
      select: ['id', 'title']
    });

    const foundEvent = await this.service.getByDateAndPlace(
      start_at, end_at, reloadedPlace
    );

    if (foundEvent.length > 0) 
      throw new HttpException(`Já Existe Evento Marcado em ${reloadedPlace.title} entre ${getBrlFormatedDateTime(new Date(start_at))} e ${getBrlFormatedDateTime(new Date(end_at))}!`, HttpStatus.BAD_REQUEST);
      
    return value;
  }
}
