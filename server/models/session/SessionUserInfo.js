import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const SessionUserInfo = sequelize.define(
  'session_user_info',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  { schema: 'session' }
);

export default SessionUserInfo;
