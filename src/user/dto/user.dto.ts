import { Exclude, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { Company } from 'src/company/company.entity';

export class UserDTO {
  @IsOptional()
  id?: number;
  
  @IsString({
    message: 'nome deve ser de tipo textual!'
  })
  name: string;

  @IsString({
    message: 'email deve ser de tipo textual!'
  })
  email: string;

  @IsString({
    message: 'papel deve ser de tipo textual!'
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsString({
    message: 'senha deve ser de tipo textual!'
  })
  @IsOptional()
  password?: string;

  @Type(() => Company)
  @IsNotEmpty()
  company: Company;
}