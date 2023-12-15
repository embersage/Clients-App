import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Company = sequelize.define(
  'company',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    contact_person: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export default Company;
