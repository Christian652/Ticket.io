import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsInt, isDecimal, IsDecimal, IsBoolean, IsNumberString, isBooleanString, IsBooleanString } from 'class-validator';

export class CategoryDTO {
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}