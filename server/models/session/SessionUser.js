import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const SessionUser = sequelize.define(
  'session_user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { schema: 'session' }
);

export default SessionUser;
