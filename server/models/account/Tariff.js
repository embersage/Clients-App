import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Tariff = sequelize.define(
  'tariff',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    amount: { type: DataTypes.INTEGER },
    duration: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export default Tariff;
