import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CategoryDTO {
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty({
        message: 'Informe o Titulo da Categoria'
    })
    title: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;
}