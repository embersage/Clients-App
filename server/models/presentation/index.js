import Category from './Category.js';
import Music from './Music.js';
import Presentation from './Presentation.js';
import PresentationAccount from './PresentationAccount.js';
import PresentationLogo from './PresentationLogo.js';
import UserAccount from '../account/UserAccount.js';
import Role from '../account/Role.js';
import associateModels from './associations.js';

associateModels();

export {
  Category,
  Music,
  Presentation,
  PresentationAccount,
  PresentationLogo,
  UserAccount,
  Role,
};
