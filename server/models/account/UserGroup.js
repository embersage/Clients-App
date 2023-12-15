import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const UserGroup = sequelize.define(
  'user_group',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    date_creation: { type: DataTypes.DATE },
  },
  { schema: 'account' }
);

export default UserGroup;
