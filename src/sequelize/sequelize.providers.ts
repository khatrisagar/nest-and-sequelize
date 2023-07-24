import { Sequelize } from 'sequelize-typescript';
import { Purchase } from 'src/purchase/purchase.entity';
import { User } from 'src/user/user.entity';

export const sequlizeProvider = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'nest-practice',
      });
      sequelize.addModels([User, Purchase]);
      await sequelize.sync();
      // await sequelize.sync({ alter: true });

      return sequelize;
    },
  },
];
