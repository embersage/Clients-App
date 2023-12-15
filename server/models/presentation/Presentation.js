import { DataTypes } from 'sequelize';
import sequelize from '../../db.js';

const Presentation = sequelize.define(
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

export default Presentation;
