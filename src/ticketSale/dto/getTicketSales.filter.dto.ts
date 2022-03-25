import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { Event } from "src/event/event.entity";
import { User } from "src/user/user.entity";

export class GetTicketSaleFilterDTO {
  @IsOptional()
  @IsString()
  sort?: 'DESC' | 'DESC';

  @IsOptional()
  @Type(() => User)
  user?: User;

  @IsOptional()
  @Type(() => Event)
  event?: Event;

  @IsOptional()
  @IsString()
  like?: string;
}