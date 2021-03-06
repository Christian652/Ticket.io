import { Repository, EntityRepository } from 'typeorm';
import { Event } from './event.entity';
import { EventDTO } from './dto/event.dto';
import { GetEventFilterDTO } from './dto/getEvents.filter.dto';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {

  public async saveEvent(
    dto: EventDTO,
  ): Promise<Event> {
    const {
      id, title, start_at, end_at, description,
      status, thumb, ticket_price, ticket_limit,
      company, place, categories
    } = dto;

    const instance = this.create();
    instance.id = id !== 'null' ? +id : null;
    instance.title = title;
    instance.start_at = start_at;
    instance.end_at = end_at;
    instance.description = description;
    instance.status = status == "false" ? false : true;
    instance.thumb = thumb;
    instance.ticket_limit = +ticket_limit;
    instance.ticket_price = +ticket_price;
    instance.company = company;
    instance.place = place;
    instance.categories = categories;

    return await instance.save();
  }

  public async getAll(parameters: GetEventFilterDTO) {
    const { companyId, placeId, sort, like, date } = parameters;

    const query = this.createQueryBuilder('events');
    query.innerJoinAndSelect('events.company', 'event_company');
    query.innerJoinAndSelect('events.place', 'event_place');
    query.leftJoinAndSelect('events.categories', 'event_categories');
    query.leftJoinAndSelect('events.ticket_sales', 'event_tickets');
    query.innerJoinAndSelect('events_tickets.user', 'event_tickets_user');

    if (like)
      query.andWhere(
        'events.title LIKE :like',
        { like: `%${like}%` }
      );

    if (sort) {
      query.orderBy('events.id', sort);
    } else {
      query.orderBy('events.id', 'DESC')
    }

    if (companyId)
      query.andWhere("events.companyId = :companyId", { companyId })

    if (placeId)
      query.andWhere("events.placeId = :placeId", { placeId })

    if (date) {
      query.andWhere("events.start_at <= :date", { date });
      query.andWhere("events.end_at >= :date", { date });
    }

    return await query.getMany();
  }

  public async disable(id: number) {
    const register = await this.findOne(id);

    if (register) {
      register.status = false;
      register.save();
    }
  }



}