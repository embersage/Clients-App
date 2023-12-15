import Category from './Category.js';
import Music from './Music.js';
import Presentation from './Presentation.js';
import PresentationAccount from './PresentationAccount.js';
import PresentationLogo from './PresentationLogo.js';
import UserAccount from '../account/UserAccount.js';
import Role from '../account/Role.js';

const associateModels = () => {
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
};

export default associateModels;
