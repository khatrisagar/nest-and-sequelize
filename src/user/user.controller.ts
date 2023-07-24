import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGaurd } from 'src/auth/guard';
import { Purchase } from 'src/purchase/purchase.entity';
import { User } from './user.entity';

@UseGuards(JwtGaurd)
@Controller('user')
export class UserController {
  constructor(
    @Inject('PURCHASE_REPOSITORY') private purchaseRepository: typeof Purchase,
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
  ) {}
  @Get()
  async check(@Req() req: Request) {
    const userAndPurchase = await this.userRepository.findAll({
      where: {
        id: (req as any).user.id,
      },

      include: [this.purchaseRepository],
    });
    return userAndPurchase;
  }
}
