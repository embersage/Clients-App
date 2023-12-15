import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Category = sequelize.define(
  'category',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  { schema: 'presentation' }
);

export default Category;
