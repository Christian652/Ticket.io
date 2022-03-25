import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetPlaceFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'DESC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}