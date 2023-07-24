import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { authSigninDto, authSignupDto } from './dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  async signup(dto: authSignupDto) {
    try {
      const user = await this.userRepository.create({ ...dto });
      return user;
    } catch (err) {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }

  async signin(dto: authSigninDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (user) {
        return user;
      } else {
        throw new Error('Not Found');
      }
    } catch (err) {
      throw new NotFoundException('INVALID_EMAIL_PASSWORD');
    }
  }
}
