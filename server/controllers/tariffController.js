import { Tariff } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class TariffController {
  async create(req, res) {
    const {
      name,
      description,
      amount,
      duration,
      id_tariff_description,
      id_currency,
    } = req.body;
    const tariff = await Tariff.create({
      name,
      description,
      amount,
      duration,
      id_tariff_description,
      id_currency,
    });
    return res.json(tariff);
  }
  async getAll(req, res) {
    const tariffs = await Tariff.findAll();
    return res.json(tariffs);
  }
  async getOne(req, res) {}
}

export default TariffController;
