import sequelize from '../../db.js';

const PresentationAccount = sequelize.define(
  'presentation_user_account',
  {},
  { schema: 'presentation' }
);

export default PresentationAccount;
