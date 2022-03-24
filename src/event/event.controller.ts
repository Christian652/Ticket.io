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
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('events')
export class EventController {
  constructor(
    private service: EventService
  ) { }

  @Post()
  @Roles(Role.Company)
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
  @Roles(Role.Company)
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
  @Roles(Role.Company, Role.Expectator, Role.Receptionist)
  public async getAll(@Query() parameters: GetEventFilterDTO): Promise<Event[]> {
    try {
      return await this.service.getAll(parameters);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @Roles(Role.Company, Role.Expectator, Role.Receptionist)
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    // verificar se o id de evento passado é da mesma empresa do recepcionista
    // caso o nivel de usuário seja recepcionista , caso seja empresa ve
    // se é da mesma empresa 
    return await this.service.getOne(id);
  }

  @Delete(':id')
  @Roles(Role.Company)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      // verificar se o evento desse id é da mesma empresa do usuário company logado

      return await this.service.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}