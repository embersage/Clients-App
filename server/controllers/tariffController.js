import { Op } from 'sequelize';
import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Tariff } = accountSchema;

class tariffController {
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

    const tariffs = await Tariff.findAndCountAll(queryOptions);

    return res.json(tariffs);
  }

  async getOne(req, res) {
    const schema = 'account';
    let { id } = req.params;

    const searchCriteria = { id };

    const queryOptions = {
      where: searchCriteria,
      schema,
    };

    const tariff = await Tariff.findOne(queryOptions);

    return res.json(tariff);
  }

  async delete(req, res) {
    const schema = 'account';
    const { tariffs } = req.body;
    let ids = [];
    tariffs.forEach((item) => {
      ids.push(item.id);
    });

    await Tariff.destroy({ where: { id: ids }, schema });

    return res.json({ message: 'Удаление произведено успешно.' });
  }
}

export default tariffController;
