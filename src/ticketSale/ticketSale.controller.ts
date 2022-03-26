import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
  Patch,
  Req
} from '@nestjs/common';
import { TicketSaleService } from './ticketSale.service';
import { TicketSaleDTO } from './dto/ticketSale.dto';
import { TicketSale } from './ticketSale.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetTicketSaleFilterDTO } from './dto/getTicketSales.filter.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { TicketSoldOutPipe } from './pipes/ticketSoldOut.pipe';
import { UserHasBuyedPipe } from './pipes/userHasBuyed.pipe';
import { Request } from 'express';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('ticket-sales')
export class TicketSaleController {
  constructor(private service: TicketSaleService) { }

  @Post()
  @Roles(Role.Expectator)
  @UsePipes(ValidationPipe, TicketSoldOutPipe, UserHasBuyedPipe)
  public async create(
    @Body() dto: TicketSaleDTO,
    @Req() req
  ): Promise<TicketSale> {
    try {
      dto.user = req.user;
      return await this.service.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  public async getAll(@Query() parameters: GetTicketSaleFilterDTO): Promise<TicketSale[]> {
    try {
      return await this.service.getAll(parameters);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  public async getOne(@Param('id', ParseIntPipe) id: number): Promise<TicketSale> {
    return await this.service.getOne(id);
  }
}