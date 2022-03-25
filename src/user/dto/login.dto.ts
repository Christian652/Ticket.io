import { IsString , IsInt, IsBoolean } from 'class-validator';

export class LoginDTO {

  @IsString()
  id: number;

  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsBoolean()
  status: boolean;


}