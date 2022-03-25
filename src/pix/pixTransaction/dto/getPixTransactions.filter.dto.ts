import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetPixTransactionFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'DESC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}