import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetCompanyFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}