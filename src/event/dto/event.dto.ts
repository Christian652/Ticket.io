import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean, IsNumberString, isBooleanString, IsBooleanString } from 'class-validator';

export class EventDTO {
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    thumb: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumberString()
    @IsNotEmpty()
    ticket_limit: number;

    @IsNumberString()
    @IsNotEmpty()
    ticket_price: number;

    @IsBooleanString()
    @IsOptional()
    status: string;

    // @IsDate()
    @IsNotEmpty()
    start_at: Date;

    // @IsDate()
    @IsNotEmpty()
    end_at: Date;
}