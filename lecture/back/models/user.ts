import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';
import { dbType } from './index';

class User extends Model {
  public readonly id!: number;
  public nickname!: string;
  public userId!: string;
  public password!: string;
  /* 사용자가 수정할 일 없이 sequelize가 관리하기때문에 readonly 부여 */
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    nickname: {
      type: DataTypes.STRING(20),
    },
    userId: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
);

export const associate = (db: dbType) => {};

export default User;
