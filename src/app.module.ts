import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from './sequelize/sequelize.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PurchaseModule } from './purchase/purchase.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule,
    UserModule,
    AuthModule,
    PurchaseModule,
  ],
})
export class AppModule {}
