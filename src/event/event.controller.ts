import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from './dto/event.dto';
import { Event } from './event.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetEventFilterDTO } from './dto/getEvents.filter.dto';

@UseGuards(AuthGuard())
@Controller('events')
export class EventController {
  constructor(
    private service: EventService
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  public async create(
    @Body() dto: EventDTO,
  ): Promise<Event> {
    try {
      return await this.service.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @UsePipes(ValidationPipe)
  public async update(
    @Body() dto: EventDTO,
  ): Promise<Event> {
    try {
      return await this.service.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getAll(@Query() parameters: GetEventFilterDTO): Promise<Event[]> {
    try {
      return await this.service.getAll(parameters);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return await this.service.getOne(id);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.service.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}