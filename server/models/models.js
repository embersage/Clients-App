import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const UserAccount = sequelize.define(
  'user_account',
  {
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
  },
  { schema: 'account' }
);

export const UserConfig = sequelize.define(
  'user_config',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    language: { type: DataTypes.STRING },
    usage_format: { type: DataTypes.STRING },
    count_excel_report: { type: DataTypes.INTEGER },
    count_pdf_report: { type: DataTypes.INTEGER },
    auto_payment: { type: DataTypes.BOOLEAN },
    user_token: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export const Role = sequelize.define(
  'role',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export const AccessLevel = sequelize.define(
  'access_level',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export const RefreshToken = sequelize.define(
  'refresh_token',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    token: { type: DataTypes.STRING },
    fingerprint: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export const Company = sequelize.define(
  'company',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    contact_person: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export const UserGroup = sequelize.define(
  'user_group',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    date_creation: { type: DataTypes.DATE },
  },
  { schema: 'account' }
);

export const GroupMember = sequelize.define(
  'group_member',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    date_creation: { type: DataTypes.DATE },
  },
  { schema: 'account' }
);

export const GroupAccount = sequelize.define(
  'user_group_user_account',
  {},
  { schema: 'account' }
);

export const PaymentInfo = sequelize.define(
  'payment_info',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
    amount: { type: DataTypes.INTEGER },
    payment_number: { type: DataTypes.INTEGER },
  },
  { schema: 'account' }
);

export const PaymentStatus = sequelize.define(
  'ckassa_payment_status',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export const Currency = sequelize.define(
  'currency',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    code: { type: DataTypes.STRING },
    symbol: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export const Tariff = sequelize.define(
  'tariff',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    amount: { type: DataTypes.INTEGER },
    duration: { type: DataTypes.STRING },
  },
  { schema: 'account' }
);

export const TariffDescription = sequelize.define(
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

export const FirstPay = sequelize.define(
  'first_pay',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
    amount: { type: DataTypes.INTEGER },
  },
  { schema: 'account' }
);

export const TariffPromocode = sequelize.define(
  'tariff_promocode',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { schema: 'account' }
);

export const Promocode = sequelize.define(
  'promocode',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING },
    discount: { type: DataTypes.INTEGER },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
  },
  { schema: 'account' }
);

export const Notification = sequelize.define(
  'notification',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    priority: { type: DataTypes.STRING },
    date_start: { type: DataTypes.DATE },
    date_end: { type: DataTypes.DATE },
  },
  { schema: 'account' }
);

export const Presentation = sequelize.define(
  'presentation',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    visible: { type: DataTypes.BOOLEAN },
    date_creation: { type: DataTypes.DATE },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    emoji: { type: DataTypes.BOOLEAN },
    timer: { type: DataTypes.BOOLEAN },
    connection_moderation: { type: DataTypes.BOOLEAN },
    music: { type: DataTypes.BOOLEAN },
    random_slide: { type: DataTypes.BOOLEAN },
    max_scale: { type: DataTypes.INTEGER },
    min_scale: { type: DataTypes.INTEGER },
    copy: { type: DataTypes.BOOLEAN },
    anonymous_enter: { type: DataTypes.BOOLEAN },
    consider_timer: { type: DataTypes.BOOLEAN },
    show_rating: { type: DataTypes.BOOLEAN },
    raise_hand: { type: DataTypes.BOOLEAN },
    single_ip: { type: DataTypes.BOOLEAN },
  },
  { schema: 'presentation' }
);

export const Category = sequelize.define(
  'category',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  { schema: 'presentation' }
);

export const PresentationLogo = sequelize.define(
  'presentation_logo',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    file: { type: DataTypes.STRING },
  },
  { schema: 'presentation' }
);

export const Music = sequelize.define(
  'music',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    file: { type: DataTypes.STRING },
  },
  { schema: 'presentation' }
);

export const PresentationAccount = sequelize.define(
  'presentation_user_account',
  {},
  { schema: 'presentation' }
);

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
UserAccount.belongsTo(Company, { foreignKey: 'id_company', schema: 'account' });

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

Currency.hasMany(PaymentInfo, { foreignKey: 'id_currency', schema: 'account' });
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

Category.hasMany(Presentation, {
  foreignKey: 'id_category',
  schema: 'presentation',
});
Presentation.belongsTo(Category, {
  foreignKey: 'id_category',
  schema: 'presentation',
});

Music.hasMany(Presentation, {
  foreignKey: 'id_music',
  schema: 'presentation',
});
Presentation.belongsTo(Music, {
  foreignKey: 'id_music',
  as: 'presentation_music',
  schema: 'presentation',
});

PresentationLogo.hasMany(Presentation, {
  foreignKey: 'id_presentation_logo',
  schema: 'presentation',
});
Presentation.belongsTo(PresentationLogo, {
  foreignKey: 'id_presentation_logo',
  schema: 'presentation',
});

Presentation.belongsToMany(UserAccount, {
  through: PresentationAccount,
  foreignKey: 'id_presentation',
  schema: 'presentation',
});
UserAccount.belongsToMany(Presentation, {
  through: PresentationAccount,
  foreignKey: 'id_user_account',
  schema: 'presentation',
});

Presentation.hasMany(PresentationAccount, {
  foreignKey: 'id_presentation',
  schema: 'presentation',
});
PresentationAccount.belongsTo(Presentation, {
  foreignKey: 'id_presentation',
  schema: 'presentation',
});
UserAccount.hasMany(PresentationAccount, {
  foreignKey: 'id_user_account',
  schema: 'presentation',
});
PresentationAccount.belongsTo(UserAccount, {
  foreignKey: 'id_user_account',
  schema: 'presentation',
});

Presentation.belongsToMany(Role, {
  through: PresentationAccount,
  foreignKey: 'id_presentation',
  schema: 'presentation',
});
Role.belongsToMany(Presentation, {
  through: PresentationAccount,
  foreignKey: 'id_user_role',
  schema: 'presentation',
});

Role.hasMany(PresentationAccount, {
  foreignKey: 'id_user_role',
  schema: 'presentation',
});
PresentationAccount.belongsTo(Role, {
  foreignKey: 'id_user_role',
  schema: 'presentation',
});
