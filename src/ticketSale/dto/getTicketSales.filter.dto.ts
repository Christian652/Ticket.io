import { IsNumberString, IsOptional, IsString } from "class-validator";

export class GetTicketSaleFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  like?: string;
}