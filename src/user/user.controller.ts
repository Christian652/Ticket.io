import { AuthService } from './../auth/auth.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
  UploadedFile,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserExistsPipe } from './pipes/userExists.pipe';

@Controller('users')
export class UserController {
  constructor(
    private service: UserService,
    private authService: AuthService
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(Role.Admin, Role.Company)
  @UseGuards(AuthGuard())
  public async create(
    @Body() dto: UserDTO,
    @Req() req
  ) {
    try {
      if (dto.role == Role.Receptionist)
        dto.company = req.user.company;
      const user = await this.service.save(dto);

      return { ...user, password: null, company: { id: user.company.id } };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('public')
  @UsePipes(ValidationPipe, UserExistsPipe)
  public async createPublic(
    @Body() dto: UserDTO,
  ) {
    try {
      dto.role = Role.Expectator;
      return await this.service.save(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe, UserExistsPipe)
  public async update(
    @Body() dto: UpdateUserDTO,
    @Req() req
  ): Promise<User> {
    try {
      const user = req.user;

      return await this.service.update(dto, user.role);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @Get()
  public async getAll(): Promise<User[]> {
    try {
      return await this.service.getAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  public async getOne(@Param('id', ParseIntPipe) id): Promise<User> {
    try {
      return await this.service.getOne(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.service.delete(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}