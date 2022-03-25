import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetPixTransactionFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}