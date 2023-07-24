import { Module } from '@nestjs/common';
import { purchaseProvider } from './purchase.providers';
import { SequelizeModule } from 'src/sequelize/sequelize.module';

@Module({
  imports: [SequelizeModule],
  providers: [...purchaseProvider],
  exports: [...purchaseProvider],
})
export class PurchaseModule {}
