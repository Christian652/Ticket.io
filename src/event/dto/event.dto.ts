import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional, IsNumberString, IsBooleanString, Min } from 'class-validator';
import { Company } from 'src/company/company.entity';
import { Place } from 'src/place/place.entity';

export class EventDTO {
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty({
        message: 'Informe o Titulo do Evento'
    })
    title: string;

    @IsString()
    @IsOptional()
    thumb: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumberString()
    @IsNotEmpty()
    ticket_limit: string;

    @IsNumberString()
    @IsNotEmpty()
    ticket_price: string;

    @IsBooleanString()
    @IsOptional()
    status: string;

    @Type(() => Company)
    @IsOptional()
    company: Company;

    @Type(() => Place)
    @IsOptional()
    place: Place;
    
    @IsNotEmpty({
        message: 'Informe o Local do Evento!'
    })
    placeId: string;

    @IsNotEmpty({
        message: 'Informe a data de inicio do evento!'
    })
    start_at: Date;

    @IsNotEmpty({
        message: 'Informe a data de fim do evento!'
    })
    end_at: Date;
}