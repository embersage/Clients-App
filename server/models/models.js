import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const UserAccount = sequelize.define('user_account', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  activate: { type: DataTypes.BOOLEAN },
  activate_code: { type: DataTypes.STRING },
  date_reg: { type: DataTypes.DATE },
  phone: { type: DataTypes.STRING },
  vk: { type: DataTypes.STRING },
  yandex: { type: DataTypes.STRING },
  temporary: { type: DataTypes.BOOLEAN },
  date_last_login: { type: DataTypes.DATE },
  email_status: { type: DataTypes.STRING },
});

export const UserConfig = sequelize.define('user_config', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  language: { type: DataTypes.STRING },
  usage_format: { type: DataTypes.STRING },
  count_excel_report: { type: DataTypes.INTEGER },
  count_pdf_report: { type: DataTypes.INTEGER },
  auto_payment: { type: DataTypes.BOOLEAN },
  user_token: { type: DataTypes.STRING },
});

export const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

export const AccessLevel = sequelize.define('access_level', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

export const RefreshToken = sequelize.define('refresh_token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  token: { type: DataTypes.STRING },
  fingerprint: { type: DataTypes.STRING },
});

export const Company = sequelize.define('company', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  contact_person: { type: DataTypes.STRING },
});

export const UserGroup = sequelize.define('user_group', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  date_creation: { type: DataTypes.DATE },
});

export const GroupMember = sequelize.define('group_member', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING },
  name: { type: DataTypes.STRING },
  date_creation: { type: DataTypes.DATE },
});

export const GroupAccount = sequelize.define('user_group_user_account', {});

export const PaymentInfo = sequelize.define('payment_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_start: { type: DataTypes.DATE },
  date_end: { type: DataTypes.DATE },
  amount: { type: DataTypes.INTEGER },
  payment_number: { type: DataTypes.INTEGER },
});

export const PaymentStatus = sequelize.define('ckassa_payment_status', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
});

export const Currency = sequelize.define('currency', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  code: { type: DataTypes.STRING },
  symbol: { type: DataTypes.STRING },
});

export const Tariff = sequelize.define('tariff', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  amount: { type: DataTypes.INTEGER },
  duration: { type: DataTypes.STRING },
});

export const TariffDescription = sequelize.define('tariff_description', {
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
});

export const FirstPay = sequelize.define('first_pay', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date_start: { type: DataTypes.DATE },
  date_end: { type: DataTypes.DATE },
  amount: { type: DataTypes.INTEGER },
});

export const TariffPromocode = sequelize.define('tariff_promocode', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const Promocode = sequelize.define('promocode', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING },
  discount: { type: DataTypes.INTEGER },
  date_start: { type: DataTypes.DATE },
  date_end: { type: DataTypes.DATE },
});

export const Notification = sequelize.define('notification', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  priority: { type: DataTypes.STRING },
  date_start: { type: DataTypes.DATE },
  date_end: { type: DataTypes.DATE },
});

UserAccount.hasOne(UserConfig, { foreignKey: 'id_user_account' });
UserConfig.belongsTo(UserAccount, { foreignKey: 'id_user_account' });

Role.hasMany(UserAccount, { foreignKey: 'id_role' });
UserAccount.belongsTo(Role, { foreignKey: 'id_role' });

AccessLevel.hasMany(UserAccount, { foreignKey: 'id_access_level' });
UserAccount.belongsTo(AccessLevel, { foreignKey: 'id_access_level' });

UserAccount.hasMany(RefreshToken, { foreignKey: 'id_user_account' });
RefreshToken.belongsTo(UserAccount, { foreignKey: 'id_user_account' });

Company.hasMany(UserAccount, { foreignKey: 'id_company' });
UserAccount.belongsTo(Company, { foreignKey: 'id_company' });

UserGroup.hasMany(GroupMember, { foreignKey: 'id_user_group' });
GroupMember.belongsTo(UserGroup, { foreignKey: 'id_user_group' });

UserAccount.belongsToMany(UserGroup, {
  through: GroupAccount,
  foreignKey: 'id_user_account',
});
UserGroup.belongsToMany(UserAccount, {
  through: GroupAccount,
  foreignKey: 'id_user_group',
});

UserAccount.belongsToMany(Tariff, {
  through: PaymentInfo,
  foreignKey: 'id_user_account',
});
Tariff.belongsToMany(UserAccount, {
  through: PaymentInfo,
  foreignKey: 'id_tariff',
});

PaymentStatus.hasMany(PaymentInfo, {
  foreignKey: 'id_ckassa_payment_status',
});
PaymentInfo.belongsTo(PaymentStatus, {
  foreignKey: 'id_ckassa_payment_status',
});

Tariff.belongsToMany(Promocode, {
  through: TariffPromocode,
  foreignKey: 'id_tariff',
});
Promocode.belongsToMany(Tariff, {
  through: TariffPromocode,
  foreignKey: 'id_promocode',
});

Tariff.hasMany(FirstPay, { foreignKey: 'id_tariff' });
FirstPay.belongsTo(Tariff, { foreignKey: 'id_tariff' });

TariffDescription.hasMany(Tariff, { foreignKey: 'id_tariff_description' });
Tariff.belongsTo(TariffDescription, { foreignKey: 'id_tariff_description' });

Currency.hasMany(PaymentInfo, { foreignKey: 'id_currency' });
PaymentInfo.belongsTo(Currency, { foreignKey: 'id_currency' });

Currency.hasMany(Tariff, { foreignKey: 'id_currency' });
Tariff.belongsTo(Currency, { foreignKey: 'id_currency' });

Company.hasMany(PaymentInfo, { foreignKey: 'id_company' });
PaymentInfo.belongsTo(Currency, { foreignKey: 'id_company' });
