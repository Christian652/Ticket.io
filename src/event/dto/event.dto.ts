import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean, IsNumberString, isBooleanString, IsBooleanString } from 'class-validator';
import { Company } from 'src/company/company.entity';
import { Place } from 'src/place/place.entity';

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

    @Type(() => Company)
    @IsNotEmpty()
    company: Company;
    
    @Type(() => Place)
    @IsNotEmpty()
    place: Place;

    @IsNotEmpty()
    start_at: Date;

    @IsNotEmpty()
    end_at: Date;
}