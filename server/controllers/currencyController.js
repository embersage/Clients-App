import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Currency } = accountSchema;

class currencyController {
  async getAll(req, res) {
    const currencies = await Currency.findAll();
    return res.json(currencies);
  }
}

export default currencyController;
