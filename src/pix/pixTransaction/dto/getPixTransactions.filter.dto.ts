import { IsOptional, IsString } from "class-validator";
import { Company } from "src/company/company.entity";
import { Event } from "src/event/event.entity";
import { User } from "src/user/user.entity";

export class GetPixTransactionFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'DESC' | 'DESC';
  
  @IsOptional()
  user?: User;

  @IsOptional()
  event?: Event;

  @IsOptional()
  company?: Company;

  @IsOptional()
  @IsString()
  like?: string;
}