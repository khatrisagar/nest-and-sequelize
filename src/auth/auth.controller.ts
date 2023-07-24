import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Dependencies,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authSigninDto, authSignupDto } from './dto';
import { Bcrypt } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

@Dependencies(AuthService, JwtService)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: authSignupDto) {
    const encryptedPassword = await new Bcrypt(
      dto.password,
    ).getEcryptPassword();
    return this.authService.signup({ ...dto, password: encryptedPassword });
  }
  @Post('signin')
  async signin(@Body() dto: authSigninDto) {
    try {
      const user = await this.authService.signin(dto);
      if (user && user.password) {
        const isRighPassword = await new Bcrypt(
          dto.password,
          user.password,
        ).getVerifiedPassword();
        console.log(isRighPassword);
        if (isRighPassword) {
          console.log('userToken');
          const userToken = await this.jwtService.signAsync({ id: user.id });
          return { access_token: userToken };
        } else {
          throw new HttpException(
            'INVALID_EMAIL_PASSWORD',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    } catch (err) {
      console.log(err);
      throw new HttpException('INVALID_EMAIL_PASSWORD', HttpStatus.NOT_FOUND);
    }
  }
}
