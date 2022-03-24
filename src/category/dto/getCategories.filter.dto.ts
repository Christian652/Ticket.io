import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetCategoryFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}