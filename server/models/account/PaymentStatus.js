import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const PaymentStatus = sequelize.define(
  'ckassa_payment_status',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export default PaymentStatus;
