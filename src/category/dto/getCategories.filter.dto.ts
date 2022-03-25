import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetCategoryFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'DESC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}