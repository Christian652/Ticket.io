import { Exclude } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class UserDTO {
  @IsOptional()
  id?: any;
  
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
  role: Role;

  @IsBoolean()
  @IsNotEmpty()
  status?: boolean;

  @IsString({
    message: 'senha deve ser de tipo textual!'
  })
  @IsOptional()
  password?: string;
}