import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(
    private service: UserService,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const foundedEmail = await this.service.getByEmail(value.email, value.id);
    
    if (foundedEmail)
      throw new HttpException(`Email em Uso!`, HttpStatus.BAD_REQUEST)
    
    return value;
  }
}
