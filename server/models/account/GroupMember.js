import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const GroupMember = sequelize.define(
  'group_member',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    date_creation: { type: DataTypes.DATE },
  },
  { schema: 'account' }
);

export default GroupMember;
