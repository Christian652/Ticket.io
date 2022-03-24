import { User } from './../../user/user.entity';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean, IsNumberString, isBooleanString, IsBooleanString } from 'class-validator';
import { Event } from 'src/event/event.entity';

export class TicketSaleDTO {
    @IsOptional()
    id?: number;

    @IsOptional()
    selled_at?: Date;

    @IsOptional()
    payed_back_at?: Date;

    @Type(() => User)
    @IsNotEmpty()
    user: User;

    @Type(() => Event)
    @IsNotEmpty()
    event: Event;
}