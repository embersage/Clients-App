import AccessLevel from './AccessLevel.js';
import Company from './Company.js';
import Currency from './Currency.js';
import FirstPay from './FirstPay.js';
import GroupAccount from './GroupAccount.js';
import GroupMember from './GroupMember.js';
import Notification from './Notification.js';
import PaymentInfo from './PaymentInfo.js';
import PaymentStatus from './PaymentStatus.js';
import Promocode from './Promocode.js';
import RefreshToken from './RefreshToken.js';
import Role from './Role.js';
import Tariff from './Tariff.js';
import TariffDescription from './TariffDescription.js';
import TariffPromocode from './TariffPromocode.js';
import UserAccount from './UserAccount.js';
import UserConfig from './UserConfig.js';
import UserGroup from './UserGroup.js';

const associateModels = () => {
  UserAccount.hasOne(UserConfig, {
    foreignKey: 'id_user_account',
    schema: 'account',
  });
  UserConfig.belongsTo(UserAccount, {
    foreignKey: 'id_user_account',
    schema: 'account',
  });

  Role.hasMany(UserAccount, { foreignKey: 'id_role', schema: 'account' });
  UserAccount.belongsTo(Role, { foreignKey: 'id_role', schema: 'account' });

  AccessLevel.hasMany(UserAccount, {
    foreignKey: 'id_access_level',
    schema: 'account',
  });
  UserAccount.belongsTo(AccessLevel, {
    foreignKey: 'id_access_level',
    schema: 'account',
  });

  UserAccount.hasMany(RefreshToken, {
    foreignKey: 'id_user_account',
    schema: 'account',
  });
  RefreshToken.belongsTo(UserAccount, {
    foreignKey: 'id_user_account',
    schema: 'account',
  });

  Company.hasMany(UserAccount, { foreignKey: 'id_company', schema: 'account' });
  UserAccount.belongsTo(Company, {
    foreignKey: 'id_company',
    schema: 'account',
  });

  UserGroup.hasMany(GroupMember, {
    foreignKey: 'id_user_group',
    schema: 'account',
  });
  GroupMember.belongsTo(UserGroup, {
    foreignKey: 'id_user_group',
    schema: 'account',
  });

  UserAccount.belongsToMany(UserGroup, {
    through: GroupAccount,
    foreignKey: 'id_user_account',
    schema: 'account',
  });
  UserGroup.belongsToMany(UserAccount, {
    through: GroupAccount,
    foreignKey: 'id_user_group',
    schema: 'account',
  });

  UserAccount.belongsToMany(Tariff, {
    through: PaymentInfo,
    foreignKey: 'id_user_account',
    schema: 'account',
  });
  Tariff.belongsToMany(UserAccount, {
    through: PaymentInfo,
    foreignKey: 'id_tariff',
    schema: 'account',
  });

  UserAccount.hasMany(PaymentInfo, {
    foreignKey: 'id_user_account',
    schema: 'account',
  });
  PaymentInfo.belongsTo(UserAccount, {
    foreignKey: 'id_user_account',
    schema: 'account',
  });
  Tariff.hasMany(PaymentInfo, { foreignKey: 'id_tariff', schema: 'account' });
  PaymentInfo.belongsTo(Tariff, { foreignKey: 'id_tariff', schema: 'account' });

  PaymentStatus.hasMany(PaymentInfo, {
    foreignKey: 'id_ckassa_payment_status',
    schema: 'account',
  });
  PaymentInfo.belongsTo(PaymentStatus, {
    foreignKey: 'id_ckassa_payment_status',
    schema: 'account',
  });

  Tariff.belongsToMany(Promocode, {
    through: TariffPromocode,
    foreignKey: 'id_tariff',
    schema: 'account',
  });
  Promocode.belongsToMany(Tariff, {
    through: TariffPromocode,
    foreignKey: 'id_promocode',
    schema: 'account',
  });

  Tariff.hasMany(TariffPromocode, {
    foreignKey: 'id_tariff',
    schema: 'account',
  });
  TariffPromocode.belongsTo(Tariff, {
    foreignKey: 'id_tariff',
    schema: 'account',
  });
  Promocode.hasMany(TariffPromocode, {
    foreignKey: 'id_promocode',
    schema: 'account',
  });
  TariffPromocode.belongsTo(Promocode, {
    foreignKey: 'id_promocode',
    schema: 'account',
  });

  Tariff.hasMany(FirstPay, { foreignKey: 'id_tariff', schema: 'account' });
  FirstPay.belongsTo(Tariff, { foreignKey: 'id_tariff', schema: 'account' });

  TariffDescription.hasMany(Tariff, {
    foreignKey: 'id_tariff_description',
    schema: 'account',
  });
  Tariff.belongsTo(TariffDescription, {
    foreignKey: 'id_tariff_description',
    schema: 'account',
  });

  Currency.hasMany(PaymentInfo, {
    foreignKey: 'id_currency',
    schema: 'account',
  });
  PaymentInfo.belongsTo(Currency, {
    foreignKey: 'id_currency',
    schema: 'account',
  });

  Currency.hasMany(Tariff, { foreignKey: 'id_currency', schema: 'account' });
  Tariff.belongsTo(Currency, { foreignKey: 'id_currency', schema: 'account' });

  Company.hasMany(PaymentInfo, { foreignKey: 'id_company', schema: 'account' });
  PaymentInfo.belongsTo(Currency, {
    foreignKey: 'id_company',
    schema: 'account',
  });

  Company.belongsToMany(Tariff, {
    through: PaymentInfo,
    foreignKey: 'id_company',
    schema: 'account',
  });
  Tariff.belongsToMany(Company, {
    through: PaymentInfo,
    foreignKey: 'id_tariff',
    schema: 'account',
  });

  Company.hasMany(PaymentInfo, {
    foreignKey: 'id_company',
    schema: 'account',
  });
  PaymentInfo.belongsTo(Company, {
    foreignKey: 'id_company',
    schema: 'account',
  });
};

export default associateModels;
