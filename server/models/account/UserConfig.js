import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const UserConfig = sequelize.define(
  'user_config',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    language: { type: DataTypes.STRING },
    usage_format: { type: DataTypes.STRING },
    count_excel_report: { type: DataTypes.INTEGER },
    count_pdf_report: { type: DataTypes.INTEGER },
    auto_payment: { type: DataTypes.BOOLEAN },
    user_token: { type: DataTypes.STRING },
    disabled_auto_payment_at: { type: DataTypes.TIME },
    count_ai_requests: { type: DataTypes.INTEGER },
  },
  { schema: 'account' }
);

export default UserConfig;
