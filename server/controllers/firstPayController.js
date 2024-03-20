import { Op } from 'sequelize';
import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { FirstPay } = accountSchema;

class firstPayController {
  async getAll(req, res, next) {
    try {
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
        searchCriteria = {
          [Op.or]: [{ id: parseInt(search) }, { id_tariff: parseInt(search) }],
        };
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

      const firstPays = await FirstPay.findAndCountAll(queryOptions);

      return res.json(firstPays);
    } catch (error) {
      return next(ApiError.internal('Ошибка при получении первых платежей.'));
    }
  }

  async getOne(req, res, next) {
    try {
      const schema = 'account';
      const { id } = req.params;

      const searchCriteria = { id };

      const queryOptions = {
        where: searchCriteria,
        schema,
      };

      const firstPay = await FirstPay.findOne(queryOptions);

      return res.json(firstPay);
    } catch (error) {
      return next(ApiError.internal('Ошибка при получении первого платежа.'));
    }
  }

  async update(req, res, next) {
    try {
      const schema = 'account';
      const { id } = req.params;
      const { data } = req.body;
      const property = Object.keys(data)[0];
      const value = Object.values(data)[0];

      const searchCriteria = { id };

      const queryOptions = {
        where: searchCriteria,
        schema,
      };

      await FirstPay.update(
        {
          [property]: value,
        },
        {
          where: { id },
          schema,
        }
      );

      const updatedNotification = await FirstPay.findOne(queryOptions);

      return res.json(updatedNotification);
    } catch (error) {
      return next(ApiError.internal('Ошибка при обновлении первого платежа.'));
    }
  }

  async delete(req, res, next) {
    try {
      const schema = 'account';
      const { firstPays } = req.body;
      let ids = [];
      firstPays.forEach((item) => {
        ids.push(item.id);
      });

      await FirstPay.destroy({ where: { id: ids }, schema });

      return res.json({ message: 'Удаление произведено успешно.' });
    } catch (error) {
      return next(ApiError.internal('Ошибка при удалении первых платежей.'));
    }
  }
}

export default firstPayController;
