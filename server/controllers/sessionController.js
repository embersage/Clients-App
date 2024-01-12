import { Op } from 'sequelize';
import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { session } = accountSchema;

class sessionController {
  async getAll(req, res) {
    const schema = 'session';
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
        searchCriteria = { code: { [Op.iLike]: `%${search}%` } };
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

    const sessions = await session.findAndCountAll(queryOptions);

    return res.json(sessions);
  }

  async getOne(req, res) {
    const schema = 'session';
    let { id } = req.params;

    /*     const includeOptions = [
      {
        model: Tariff,
        attributes: ['name'],
      },
    ]; */

    const searchCriteria = { id };

    const queryOptions = {
      where: searchCriteria,
      //include: includeOptions,
      schema,
    };

    const session = await session.findOne(queryOptions);

    return res.json(session);
  }

  async delete(req, res) {
    const schema = 'account';
    const { sessions } = req.body;
    let ids = [];
    sessions.forEach((item) => {
      ids.push(item.id);
    });

    await session.destroy({ where: { id: ids }, schema });

    return res.json({ message: 'Удаление произведено успешно.' });
  }
}

export default sessionController;
