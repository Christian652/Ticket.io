import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { PixKeyTypes } from '../enums/pixKeyTypes.enum';

export class CompanyDTO {
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    owner_name: string;

    @IsString()
    @IsNotEmpty()
    pix_key: string;

    @IsEnum(PixKeyTypes)
    @IsNotEmpty()
    pix_key_type: PixKeyTypes;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}