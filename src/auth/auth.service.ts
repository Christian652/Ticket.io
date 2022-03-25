import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }


  async login(userDto: UserDTO) {
    const login = await this.userService.findByLogin(userDto.email, userDto.password);

    if (!login)
      throw new HttpException('Credenciais inválidas!', HttpStatus.UNAUTHORIZED)

    if (!login.status)
      throw new HttpException('Conta Desativada, Entre em Contato com Administrador do Sistema!', HttpStatus.UNAUTHORIZED)

    const id = login.id;
    const token = this.generateToken(id);

    return ({ id: id, user: login.name, ...token });
  }

  async validateUser(id): Promise<UserDTO> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private generateToken(id) {
    const expiresIn = process.env.EXPIRESIN;
    const accessToken = this.jwtService.sign({ id: id });

    return {
      expiresIn,
      accessToken,
    };
  }
}