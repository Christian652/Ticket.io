import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventDTO } from './dto/event.dto';
import { EventRepository } from './event.repository';
import { GetEventFilterDTO } from './dto/getEvents.filter.dto';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  
  constructor(
    @InjectRepository(EventRepository)
    private repository: EventRepository,
  ) { }

  public async save(
    dto: EventDTO,
  ): Promise<Event> {
    try {
      return await this.repository.saveEvent(dto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAll(parameters: GetEventFilterDTO): Promise<Event[]> {
    return await this.repository.getAll(parameters);
  }

  public async getOne(id: number): Promise<Event> {

    const foundEvent = await this.repository.findOne(id);
    if (!foundEvent) {
      this.logger.warn(` Can't Found Event With Id : ${id} `);
      throw new NotFoundException(`Não Existe Produto Com o Id: ${id}`);
    }
    return foundEvent;
  }

  public async delete(id: number): Promise<void> {
    try {
      await this.repository.disable(id);
    } catch (e) {
      throw new HttpException(e.code, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}