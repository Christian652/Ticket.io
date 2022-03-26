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
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
  Req
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDTO } from './dto/event.dto';
import { Event } from './event.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetEventFilterDTO } from './dto/getEvents.filter.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'; 
import { Response, response } from 'express';
import { EventTrated } from './types/EventTrated';
@UseGuards(AuthGuard(), RolesGuard)
@Controller('events')
export class EventController {
  constructor(
    private service: EventService
  ) { }

  @Post()
  @Roles(Role.Company)
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor("thumb", {
      storage: diskStorage({
        destination: './uploads/eventThumbs',
        filename: function (req, file, cb) {
          cb(null, Date.now() + '.' + file.originalname.split('.')[1])
        }
      }),
      limits: { fileSize: 1000000 },
      fileFilter: (req, image, callback) => {
        if (!image.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          req.fileValidationError = `a capa do evento deve ser uma imagem!`;
          return callback(null, false)
        }
        return callback(null, true)
      },
    })
  )
  public async create(
    @Body() dto: EventDTO,
    @UploadedFile() thumb,
    @Req() req
  ): Promise<EventTrated> {
    try {
      dto.thumb = thumb.path;
      dto.company = req.user.company
      const event = await this.service.save(dto);

      return {
        id: event.id,
        description: event.description,
        start_at: event.start_at,
        end_at: event.end_at,
        status: event.status,
        title: event.title,
        ticket_limit: event.ticket_limit,
        ticket_price: event.ticket_price,
        place: { id: event.place.id },
        company: { id: event.company.id },
      }
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

  @Get('thumb/:path')
  @Roles(Role.Company, Role.Expectator, Role.Receptionist)
  public async getThumb(
    @Param('path') path: string,
    @Res() response: Response
  ): Promise<any> {
    return response.sendFile(path)
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