import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean, IsNumberString, isBooleanString, IsBooleanString } from 'class-validator';

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
    cnpj: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}