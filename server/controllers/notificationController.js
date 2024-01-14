import { Op } from 'sequelize';
import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Notification } = accountSchema;
class notificationController {
  async getAll(req, res) {
    const schema = 'account';
    let { usePagination, limit, page, sortBy, sortType, search } = req.query;
    usePagination =
      usePagination === (undefined || '') ? true : usePagination === 'true';
    limit = limit || 10;
    page = page || 1;
    sortBy = sortBy || 'id';
    sortType = sortType || 'ASC';
    search = search || '';
    const offset = page * limit - limit;
    let searchCriteria = {};

    if (search) {
      if (!isNaN(search)) {
        searchCriteria = {
          id: parseInt(search),
        };
      } else {
        searchCriteria = { name: { [Op.iLike]: `%${search}%` } };
      }
    }

    const queryOptions = {
      where: searchCriteria,
      order: [[sortBy, sortType]],
      schema,
    };

    if (usePagination) {
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    const notifications = await Notification.findAndCountAll(queryOptions);

    return res.json(notifications);
  }

  async getOne(req, res) {
    const schema = 'account';
    const { id } = req.params;

    const searchCriteria = { id };

    const queryOptions = {
      where: searchCriteria,
      schema,
    };

    const notification = await Notification.findOne(queryOptions);

    return res.json(notification);
  }

  async update(req, res) {
    const schema = 'account';
    const { id } = req.params;
    const { data } = req.body;
    const property = Object.keys(data)[0];
    const value = Object.values(data)[0];
    console.log(id);
    console.log(data);

    const searchCriteria = { id };

    const queryOptions = {
      where: searchCriteria,
      schema,
    };

    await Notification.update(
      {
        [property]: value,
      },
      {
        where: { id },
        schema,
      }
    );

    const updatedNotification = await Notification.findOne(queryOptions);

    console.log(updatedNotification);

    return res.json(updatedNotification);
  }

  async delete(req, res) {
    const schema = 'account';
    const { notifications } = req.body;
    let ids = [];
    notifications.forEach((item) => {
      ids.push(item.id);
    });

    await Notification.destroy({ where: { id: ids }, schema });

    return res.json({ message: 'Удаление произведено успешно.' });
  }
}

export default notificationController;
