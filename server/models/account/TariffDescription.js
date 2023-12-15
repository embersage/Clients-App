import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const TariffDescription = sequelize.define(
  'tariff_description',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count_members: { type: DataTypes.INTEGER },
    count_presentations: { type: DataTypes.INTEGER },
    count_groups: { type: DataTypes.INTEGER },
    count_excel_reports: { type: DataTypes.INTEGER },
    count_pdf_reports: { type: DataTypes.INTEGER },
    count_slides: { type: DataTypes.INTEGER },
    count_questions: { type: DataTypes.INTEGER },
    branding: { type: DataTypes.BOOLEAN },
    private: { type: DataTypes.BOOLEAN },
  },
  { schema: 'account' }
);

export default TariffDescription;
