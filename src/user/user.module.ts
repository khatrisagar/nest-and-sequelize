import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProvider } from './user.providers';
import { SequelizeModule } from 'src/sequelize/sequelize.module';
import { purchaseProvider } from 'src/purchase/purchase.providers';

@Module({
  imports: [SequelizeModule],
  controllers: [UserController],
  providers: [UserService, ...userProvider, ...purchaseProvider],
  exports: [...userProvider],
})
export class UserModule {}
