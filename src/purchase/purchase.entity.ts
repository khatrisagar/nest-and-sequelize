import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table({
  timestamps: false,
})
export class Purchase extends Model<Purchase> {
  @ForeignKey(() => User)
  @Column
  userId: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  quantity: number;
}
