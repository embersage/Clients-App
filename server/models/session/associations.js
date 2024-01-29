import Session from './Session.js';
import SessionUser from './SessionUser.js';
import SessionUserInfo from './SessionUserInfo.js';
import LaunchType from './LaunchType.js';
import Presentation from '../presentation/Presentation.js';
import UserGroup from '../account/UserGroup.js';
import GroupMember from '../account/GroupMember.js';

const associateModels = () => {
  SessionUser.hasMany(SessionUserInfo, {
    foreignKey: 'id_session_user',
    schema: 'session',
  });
  SessionUserInfo.belongsTo(SessionUser, {
    foreignKey: 'id_session_user',
    schema: 'session',
  });

  GroupMember.hasMany(SessionUser, {
    foreignKey: 'id_group_member',
    schema: 'session',
  });
  SessionUser.belongsTo(GroupMember, {
    foreignKey: 'id_group_member',
    schema: 'session',
  });

  Session.hasMany(SessionUser, {
    foreignKey: 'id_session',
    schema: 'session',
  });
  SessionUser.belongsTo(Session, {
    foreignKey: 'id_session',
    schema: 'session',
  });

  LaunchType.hasMany(Session, {
    foreignKey: 'id_launch_type',
    schema: 'session',
  });
  Session.belongsTo(LaunchType, {
    foreignKey: 'id_launch_type',
    schema: 'session',
  });

  Presentation.hasMany(Session, {
    foreignKey: 'id_presentation',
    schema: 'session',
  });
  Session.belongsTo(Presentation, {
    foreignKey: 'id_presentation',
    schema: 'session',
  });

  UserGroup.hasMany(Session, {
    foreignKey: 'id_user_group',
    schema: 'session',
  });
  Session.belongsTo(UserGroup, {
    foreignKey: 'id_user_group',
    schema: 'session',
  });
};

export default associateModels;
