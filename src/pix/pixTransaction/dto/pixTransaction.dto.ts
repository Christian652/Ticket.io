import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean, IsNumberString, isBooleanString, IsBooleanString } from 'class-validator';

export class PixTransactionDTO {
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}