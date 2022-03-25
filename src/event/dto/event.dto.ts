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
    @Min(0, { message: 'O Limite de Ingressos Deve Ser maior que 0!'})
    ticket_limit: number;

    @IsNumberString()
    @IsNotEmpty()
    @Min(0, { message: 'O Preço de Ingresso Deve Ser maior que 0!'})
    ticket_price: number;

    @IsBooleanString()
    @IsOptional()
    status: string;

    @Type(() => Company)
    @IsNotEmpty({
        message: 'Informe a Empresa do Evento!'
    })
    company: Company;
    
    @Type(() => Place)
    @IsNotEmpty({
        message: 'Informe o Local do Evento!'
    })
    place: Place;

    @IsNotEmpty({
        message: 'Informe a data de inicio do evento!'
    })
    start_at: Date;

    @IsNotEmpty({
        message: 'Informe a data de fim do evento!'
    })
    end_at: Date;
}