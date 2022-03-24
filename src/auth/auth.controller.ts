// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');


import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,

} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../user/dto/user.dto';
import { getRepository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { SmtpService } from 'src/smtp/smtp.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {

  private crypto = require('crypto');

  constructor(
    private authService: AuthService,
  ) { }

  @Post('login')
  public async jwtGenerate(
    @Body() userDto: UserDTO
  ) {
    return await this.authService.login(userDto);
  }
}
