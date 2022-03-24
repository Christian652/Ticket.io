import { IsInt, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class UpdateUserDTO {
  @IsNotEmpty({
    message: 'informe o id do usuário'
  })
  id: number;
  
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  email?: string;

  @IsBoolean()
  @IsNotEmpty()
  status?: boolean;

  @IsString()
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  password?: string;
}