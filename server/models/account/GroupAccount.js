import sequelize from '../../db.js';

export const GroupAccount = sequelize.define(
  'user_group_user_account',
  {},
  { schema: 'account' }
);

export default GroupAccount;
