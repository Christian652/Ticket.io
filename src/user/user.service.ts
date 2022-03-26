import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoginDTO } from './dto/login.dto';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Not } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository,
  ) { }

  public async save(dto: UserDTO) {
    return await this.repository.saveUser(dto);
  }

  public async update(dto: UpdateUserDTO, loggedUserRole: Role) {
    try {
      if (loggedUserRole)
        dto.role = loggedUserRole;

      return await this.repository.updateUser(dto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAll(): Promise<User[]> {
    return await this.repository.find({
      relations: ['company']
    });
  }

  public async getOne(id: number): Promise<User> {
    const foundUser = await this.repository.findOne(id);
    if (!foundUser)
      throw new NotFoundException('Usuário não encontrado');
    return foundUser;
  }

  public async getByEmail(email: string, exceptId?: number): Promise<User> {
    if (exceptId)
      return await this.repository.findOne({
        where: { email, id: Not(exceptId) },
      });

    return await this.repository.findOne({
      where: { email }
    });
  }

  public async findByLogin(email: string, password: string): Promise<LoginDTO> {
    const user = await this.repository
      .createQueryBuilder("users")
      .where("users.email = :email", { email: email })
      .getOne();

    if (!user) throw new HttpException(`Nenhum usuário corresponde a essas credenciais!`, HttpStatus.UNAUTHORIZED)

    const login = await user.validatePassword(password);

    return login ? { id: user.id, name: user.name, role: user.role, status: user.status } : null;
  }

  async findById({ id }: any): Promise<User> {
    return await this.repository.findOne({
      where: { id },
      relations: ['company']
    });
  }

  public async delete(userId: number): Promise<User> {
    const user = await this.getOne(userId);

    return await this.repository.disable(user);
  }


}


