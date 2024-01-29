import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const LaunchType = sequelize.define(
  'launch_type',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  { schema: 'session' }
);

export default LaunchType;
