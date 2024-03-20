import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Tariff } = accountSchema;

class tariffController {
  async getAll(req, res, next) {
    try {
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
    } catch (error) {
      return next(ApiError.internal('Ошибка при получении тарифов.'));
    }
  }

  async getOne(req, res, next) {
    try {
      const schema = 'account';
      let { id } = req.params;

      const searchCriteria = { id };

      const queryOptions = {
        where: searchCriteria,
        schema,
      };

      const tariff = await Tariff.findOne(queryOptions);

      return res.json(tariff);
    } catch (error) {
      return next(ApiError.internal('Ошибка при получении тарифа.'));
    }
  }

  async delete(req, res, next) {
    try {
      const schema = 'account';
      const { tariffs } = req.body;
      let ids = [];
      tariffs.forEach((item) => {
        ids.push(item.id);
      });

      await Tariff.destroy({ where: { id: ids }, schema });

      return res.json({ message: 'Удаление произведено успешно.' });
    } catch (error) {
      return next(ApiError.internal('Ошибка при удалении тарифов.'));
    }
  }
}

export default tariffController;
