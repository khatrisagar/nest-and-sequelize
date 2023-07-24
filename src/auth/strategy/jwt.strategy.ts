import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.entity';

export {};
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //   secretOrKey: config.get('JWT_SECRET'),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: any) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: payload.id,
        },
        attributes: {
          exclude: ['password'],
        },
      });
      return user;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
