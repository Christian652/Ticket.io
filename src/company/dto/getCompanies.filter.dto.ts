import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetCompanyFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'DESC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}