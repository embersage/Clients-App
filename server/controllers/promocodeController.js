import { Op } from 'sequelize';
import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Promocode, Tariff, TariffPromocode } = accountSchema;

class promocodeController {
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

    const promocodes = await Promocode.findAndCountAll(queryOptions);

    return res.json(promocodes);
  }

  async getOne(req, res) {
    const schema = 'account';
    const { id } = req.params;

    const includeOptions = [
      {
        model: Tariff,
      },
    ];

    const searchCriteria = { id };

    const queryOptions = {
      where: searchCriteria,
      include: includeOptions,
      schema,
    };

    const promocode = await Promocode.findOne(queryOptions);

    return res.json(promocode);
  }

  async update(req, res) {
    const schema = 'account';
    const { id } = req.params;
    const { data } = req.body;
    const property = Object.keys(data)[0];
    const value = Object.values(data)[0];
    console.log(
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    );
    console.log(data);

    const includeOptions = [
      {
        model: Tariff,
      },
    ];

    const searchCriteria = { id };

    const queryOptions = {
      where: searchCriteria,
      include: includeOptions,
      schema,
    };

    if (property === 'tariffs') {
      let ids = [];
      value.forEach((item) => {
        ids.push(item.id);
      });
      const existingRows = await TariffPromocode.findAll({
        where: { id_promocode: id },
        attributes: ['id_tariff'],
        raw: true,
        schema,
      });

      const existingTariffs = existingRows.map((row) => row.id_tariff);

      const itemsToRemove = existingTariffs.filter(
        (existingTariff) => !ids.includes(existingTariff)
      );
      const itemsToAdd = ids.filter(
        (newTariff) => !existingTariffs.includes(newTariff)
      );

      if (itemsToRemove.length > 0) {
        await TariffPromocode.destroy({
          where: { id_promocode: id, id_tariff: itemsToRemove },
          schema,
        });
      }
      if (itemsToAdd.length > 0) {
        await TariffPromocode.bulkCreate(
          itemsToAdd.map((tariffId) => ({
            id_promocode: id,
            id_tariff: tariffId,
          })),
          { schema }
        );
      }
    } else {
      await Promocode.update(
        {
          [property]: value,
        },
        {
          where: { id },
          schema,
        }
      );
    }

    const updatedPromocode = await Promocode.findOne(queryOptions);

    console.log(updatedPromocode);

    return res.json(updatedPromocode);
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
