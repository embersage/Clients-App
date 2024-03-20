import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Currency } = accountSchema;

class currencyController {
  async getAll(req, res, next) {
    try {
      const currencies = await Currency.findAll();
      return res.json(currencies);
    } catch (error) {
      return next(ApiError.internal('Ошибка при получении валют.'));
    }
  }
}

export default currencyController;
