import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Promocode, TariffPromocode } = accountSchema;

class promocodeController {
  async getAll(req, res) {
    const schema = 'account';
    let { limit, page } = req.query;
    limit = limit || 10;
    page = page || 1;
    const offset = page * limit - limit;
    const promocodes = await Promocode.findAndCountAll({
      limit,
      offset,
      schema,
    });

    return res.json(promocodes);
  }

  async getOne(req, res) {
    const schema = 'account';
    const { id } = req.params;
    const promocode = await Promocode.findOne({ where: { id }, schema });
    return res.json(promocode);
  }

  async delete(req, res) {
    const schema = 'account';
    const { promocodes } = req.body;
    let ids = [];
    promocodes.forEach((item) => {
      ids.push(item.id);
    });

    await Promocode.destroy({ where: { id: ids }, schema });

    return res.json({ message: 'Удаление произведено успешно.' });
  }
}

export default promocodeController;
