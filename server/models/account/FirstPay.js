import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const FirstPay = sequelize.define(
  'first_pay',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
    amount: { type: DataTypes.INTEGER },
  },
  { schema: 'account' }
);

export default FirstPay;
