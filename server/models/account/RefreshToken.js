import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const RefreshToken = sequelize.define(
  'refresh_token',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.STRING },
    fingerprint: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export default RefreshToken;
