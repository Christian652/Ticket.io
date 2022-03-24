import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean, IsNumberString, isBooleanString, IsBooleanString } from 'class-validator';

export class TicketSaleDTO {
    @IsOptional()
    id?: number;

    @IsOptional()
    selled_at?: Date;

    @IsOptional()
    payed_back_at?: Date;
}