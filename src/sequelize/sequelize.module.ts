import { Module } from '@nestjs/common';
import { sequlizeProvider } from './sequelize.providers';

@Module({
  providers: [...sequlizeProvider],
  exports: [...sequlizeProvider],
})
export class SequelizeModule {}
