import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetPlaceFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}