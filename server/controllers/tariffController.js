import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Tariff } = accountSchema;

class tariffController {
  async getAll(req, res) {
    const schema = 'account';
    let { usePagination, sortBy, sortType } = req.query;
    usePagination =
      usePagination === (undefined || '') ? true : usePagination === 'true';
    sortBy = sortBy || 'id';
    sortType = sortType || 'ASC';

    const queryOptions = {
      order: [[sortBy, sortType]],
      schema,
    };

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
