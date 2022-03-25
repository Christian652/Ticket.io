import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class PlaceDTO {
    @IsOptional()
    id?: number;

    @IsNotEmpty({
        message: 'Informe o Titulo do Local'
    })
    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty({
        message: 'Informe a Cidade'
    })
    city: string;

    @IsString()
    @IsNotEmpty({
        message: 'Informe a Rua'
    })
    street: string;

    @IsString()
    @IsNotEmpty({
        message: 'Informe o Cep'
    })
    cep: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}