import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { PixKeyTypes } from '../enums/pixKeyTypes.enum';

export class CompanyDTO {
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty({
        message: 'Informe o Nome da Empresa'
    })
    name: string;

    @IsString()
    @IsNotEmpty({
        message: 'Informe o Nome do(a) Proprietário(a)'
    })
    owner_name: string;

    @IsString()
    @IsNotEmpty({
        message: 'Informe a chave pix da empresa'
    })
    pix_key: string;

    @IsEnum(PixKeyTypes, {
        message: `Valores Aceitos: ${PixKeyTypes.CPF} ${PixKeyTypes.EMAIL} ${PixKeyTypes.RANDOM}`
    })
    @IsNotEmpty({
        message: 'Informe o tipo de chave pix'
    })
    pix_key_type: PixKeyTypes;

    @IsString()
    @IsNotEmpty({
        message: 'Informe o cnpj'
    })
    cnpj: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}