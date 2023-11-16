import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const UserAccount = sequelize.define('user_account', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  activate: { type: DataTypes.BOOLEAN },
  activate_code: { type: DataTypes.INTEGER },
  date_reg: { type: DataTypes.DATE },
  phone: { type: DataTypes.STRING, unique: true },
  vk: { type: DataTypes.STRING, unique: true },
  yandex: { type: DataTypes.STRING, unique: true },
  temporary: { type: DataTypes.BOOLEAN },
  date_last_login: { type: DataTypes.DATE },
  email_status: { type: DataTypes.STRING },
});

export const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

export const UserConfig = sequelize.define('user_config', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  language: { type: DataTypes.STRING },
  usage_format: { type: DataTypes.STRING },
  count_excel_report: { type: DataTypes.INTEGER },
  count_pdf_report: { type: DataTypes.INTEGER },
  auto_payment: { type: DataTypes.BOOLEAN },
  user_token: { type: DataTypes.STRING, unique: true },
});

export const RefreshToken = sequelize.define('refresh_token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  token: { type: DataTypes.STRING, unique: true },
  fingerprint: { type: DataTypes.STRING, unique: true },
});

export const UserGroupUserAccount = sequelize.define(
  'user_group_user_account',
  {}
);

export const UserGroup = sequelize.define('user_group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  date_creation: { type: DataTypes.DATE },
});

export const GroupMember = sequelize.define('group_member', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING },
  date_creation: { type: DataTypes.DATE },
});

export const Company = sequelize.define('company', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  phone: { type: DataTypes.INTEGER, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  contact_person: { type: DataTypes.STRING },
});

Role.hasMany(UserAccount, { foreignKey: 'id_role' });
UserAccount.belongsTo(Role, { foreignKey: 'id_role' });

UserAccount.hasMany(RefreshToken, { foreignKey: 'id_user_account' });
RefreshToken.belongsTo(UserAccount, { foreignKey: 'id_user_account' });

UserGroup.hasMany(GroupMember, { foreignKey: 'id_user_group' });
GroupMember.belongsTo(UserGroup, { foreignKey: 'id_user_group' });

UserAccount.hasMany(UserGroup);
UserGroup.belongsToMany(UserAccount, { through: UserGroupUserAccount });

UserConfig.hasOne(UserAccount, { foreignKey: 'id_user_account' });
UserAccount.belongsTo(UserConfig, { foreignKey: 'id_user_account' });

Company.hasMany(UserAccount, { foreignKey: 'id_company' });
UserAccount.belongsTo(Company, { foreignKey: 'id_company' });
