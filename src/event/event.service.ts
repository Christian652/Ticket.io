import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventDTO } from './dto/event.dto';
import { EventRepository } from './event.repository';
import { GetEventFilterDTO } from './dto/getEvents.filter.dto';
import { getRepository, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual } from 'typeorm';
import { Place } from 'src/place/place.entity';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/category.entity';
import { getToday } from 'src/utils/date';
import { User } from 'src/user/user.entity';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(EventRepository)
    private repository: EventRepository
  ) { }

  public async save(
    dto: EventDTO,
  ): Promise<Event> {
    try {
      dto.place = await this.reloadPlace(dto.place);
      dto.categories = await this.reloadCategories(dto.categoryIds);

      return await this.repository.saveEvent(dto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async reloadCategories(stringWithIds): Promise<Category[]> {
    const categoryIds = stringWithIds.split(",");
      const categoryPromises = categoryIds.map(
        item => getRepository(Category).findOne(+item)
      );
      return await Promise.all(categoryPromises);
  }

  private async reloadPlace(placeId) {
    return await getRepository(Place).findOne(placeId)
  }

  public async getAll(parameters: GetEventFilterDTO): Promise<Event[]> {
    return await this.repository.getAll(parameters);
  }

  public async getExpireds(): Promise<Event[]> {
    const date = getToday({
      formated: true, withTime: true
    });

    return await this.repository.find({
      where: {
        status: false,
        end_at: MoreThanOrEqual(date)
      }
    });
  }

  public async getByDateAndPlace(
    start_at: string,
    end_at: string,
    place: Place
  ): Promise<Event[]> {
    return await this.repository.find({
      where: [
        {
          start_at: MoreThanOrEqual(start_at),
          end_at: MoreThanOrEqual(start_at),
          place
        },
        {
          start_at: MoreThanOrEqual(end_at),
          end_at: MoreThanOrEqual(end_at),
          place
        }
      ]
    });
  }

  public async getOne(id: number): Promise<Event> {

    const foundEvent = await this.repository.findOne({
      relations: ['ticket_sales', 'company'],
      where: { id }
    });
    if (!foundEvent) {
      this.logger.warn(` Can't Found Event With Id : ${id} `);
      throw new NotFoundException(`Não Existe Evento Com o Id: ${id}`);
    }
    return foundEvent;
  }

  public async delete(id: number, user: User): Promise<void> {
    try {
      const reloadedEvent = await this.getOne(id);
      if (reloadedEvent.company !== user.company)
        throw new NotFoundException(`Esse Evento não Pertence a Sua Empresa!`);
      await this.repository.disable(id);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}