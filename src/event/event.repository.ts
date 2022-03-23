import { Repository, EntityRepository } from 'typeorm';
import { Event } from './event.entity';
import { EventDTO } from './dto/event.dto';
import { GetEventFilterDTO } from './dto/getEvents.filter.dto';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {

  public async saveEvent(
    dto: EventDTO,
  ): Promise<Event> {
    const { id, title, startAt, endAt } = dto;

    const instance = this.create();
    instance.id = id ? id : null;
    instance.title = title;
    instance.startAt = startAt;
    instance.endAt = endAt;

    return await instance.save();
  }

  public async getAll(parameters: GetEventFilterDTO) {
    const { orderBy, sort, like } = parameters;

    const query = this.createQueryBuilder('events');

    if (like) 
      query.andWhere(
        'events.title LIKE :like', 
        {like: `%${like}%`}
      );

    if (orderBy) 
      if (sort) {
        query.orderBy(orderBy, sort);
      } else {
        query.orderBy(orderBy)
      }

    return await query.getMany();
  }

}