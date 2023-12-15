import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Currency = sequelize.define(
  'currency',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    symbol: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export default Currency;
