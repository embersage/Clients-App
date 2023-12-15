import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const UserAccount = sequelize.define(
  'user_account',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    activate: { type: DataTypes.BOOLEAN },
    activate_code: { type: DataTypes.STRING },
    date_reg: { type: DataTypes.DATE },
    phone: { type: DataTypes.STRING },
    vk: { type: DataTypes.STRING },
    yandex: { type: DataTypes.STRING },
    temporary: { type: DataTypes.BOOLEAN },
    date_last_login: { type: DataTypes.DATE },
    email_status: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export default UserAccount;
