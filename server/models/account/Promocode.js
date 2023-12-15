import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Promocode = sequelize.define(
  'promocode',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING },
    discount: { type: DataTypes.INTEGER },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
  },
  { schema: 'account' }
);

export default Promocode;
