import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';
import formatDate from '../utils/formatDate.js';

const { Notification } = accountSchema;

class notificationController {
  async getAll(req, res) {
    const schema = 'account';
    let { limit, page } = req.query;
    limit = limit || 10;
    page = page || 1;
    const offset = page * limit - limit;
    const notifications = await Notification.findAndCountAll({
      limit,
      offset,
      schema,
    });

    return res.json(notifications);
  }
  async getOne(req, res) {
    const schema = 'account';
    const { id } = req.params;
    const notification = await Notification.findOne({ where: { id }, schema });
    return res.json(notification);
  }
}

export default notificationController;
