import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const PaymentInfo = sequelize.define(
  'payment_info',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
    amount: { type: DataTypes.INTEGER },
    payment_number: { type: DataTypes.INTEGER },
  },
  { schema: 'account' }
);

export default PaymentInfo;
