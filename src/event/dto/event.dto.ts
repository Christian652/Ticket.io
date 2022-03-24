import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean } from 'class-validator';

export class EventDTO {
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    thumb: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsInt()
    @IsNotEmpty()
    ticket_limit: number;

    @IsDecimal()
    @IsNotEmpty()
    ticket_price: number;

    @IsBoolean()
    @IsOptional()
    status: boolean;

    @IsDate()
    @IsNotEmpty()
    start_at: Date;

    @IsDate()
    @IsNotEmpty()
    end_at: Date;
}