import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Purchase } from 'src/purchase/purchase.entity';

@Table({
  timestamps: false,
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column
  password: string;

  @HasMany(() => Purchase)
  purchases: Purchase[];
}
