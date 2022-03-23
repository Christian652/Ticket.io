import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

export class EventDTO {

    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @IsNotEmpty()
    startAt: Date;

    @IsDate()
    @IsNotEmpty()
    endAt: Date;
}