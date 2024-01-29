import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Session = sequelize.define(
  'session',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
    code: { type: DataTypes.STRING },
    entry_closed: { type: DataTypes.BOOLEAN },
  },
  { schema: 'session' }
);

export default Session;
