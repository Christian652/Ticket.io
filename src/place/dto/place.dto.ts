import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean, IsNumberString, isBooleanString, IsBooleanString } from 'class-validator';

export class PlaceDTO {
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    cep: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}