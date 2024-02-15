import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Notification = sequelize.define(
  'notification',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    priority: { type: DataTypes.STRING },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
    page: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export default Notification;
