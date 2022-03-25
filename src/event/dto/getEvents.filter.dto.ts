import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetEventFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'DESC' | 'DESC';

  @IsOptional()
  @IsNumberString()
  companyId?: string;

  @IsOptional()
  @IsNumberString()
  placeId?: string;

  @IsOptional()
  @IsString()
  like?: string;
}