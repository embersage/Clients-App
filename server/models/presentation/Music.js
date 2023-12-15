import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Music = sequelize.define(
  'music',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    file: { type: DataTypes.STRING },
  },
  { schema: 'presentation' }
);

export default Music;
