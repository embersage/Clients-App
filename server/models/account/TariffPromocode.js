import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const TariffPromocode = sequelize.define(
  'tariff_promocode',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { schema: 'account' }
);

export default TariffPromocode;
