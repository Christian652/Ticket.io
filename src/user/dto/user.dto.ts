import { Exclude, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';
import { Company } from 'src/company/company.entity';
import { PixKeyTypes } from 'src/company/enums/pixKeyTypes.enum';

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

  @IsString()
  @IsOptional()
  pix_key?: string;

  @IsEnum(PixKeyTypes, {
      message: `Valores Aceitos: ${PixKeyTypes.CPF} ${PixKeyTypes.EMAIL} ${PixKeyTypes.RANDOM}`
  })
  @IsOptional()
  pix_key_type?: PixKeyTypes;

  @IsString({
    message: 'senha deve ser de tipo textual!'
  })
  @IsOptional()
  password?: string;

  @Type(() => Company)
  @IsOptional()
  company?: Company;
}