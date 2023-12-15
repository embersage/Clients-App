import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const AccessLevel = sequelize.define(
  'access_level',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export default AccessLevel;
