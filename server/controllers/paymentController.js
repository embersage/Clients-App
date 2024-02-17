import { Op } from 'sequelize';
import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { PaymentInfo, PaymentStatus, UserAccount, Tariff, Company, Currency } =
  accountSchema;

class paymentController {
  /* 
   TODO
    - по сумме подписки
    - по тарифу
    - по валюте
*/
  async getAll(req, res) {
    const schema = 'account';
    let {
      usePagination,
      limit,
      page,
      sortBy,
      sortType,
      search,
      amount,
      selectedCurrencies,
      selectedTariffs,
    } = req.query;
    usePagination =
      usePagination === (undefined || '') ? true : usePagination === 'true';
    limit = limit || 10;
    page = page || 1;
    sortBy = sortBy || 'id';
    sortType = sortType || 'ASC';
    search = search || '';
    amount = amount || '';
    selectedTariffs = selectedTariffs || [];
    selectedCurrencies = selectedCurrencies || [];
    const offset = page * limit - limit;

    const includeOptions = [
      {
        model: Tariff,
        attributes: ['id', 'name'],
      },
      {
        model: UserAccount,
        attributes: ['id', 'name'],
      },
      {
        model: PaymentStatus,
        attributes: ['id', 'name'],
      },
    ];
    let payments = [];
    let searchCriteria = {};

    if (search) {
      if (!isNaN(search)) {
        searchCriteria = {
          id: parseInt(search),
        };
      } else {
        includeOptions[1].where = {
          [Op.or]: {
            name: { [Op.iLike]: `%${search}%` },
          },
        };
      }
    }

    if (selectedCurrencies.length > 0) {
      searchCriteria = {
        id_currency: selectedCurrencies,
      };
    }

    if (selectedTariffs.length > 0) {
      includeOptions[0].where = {
        id: selectedTariffs,
      };
    }

    let sort;

    if (!sortBy.includes('.')) {
      sort = [sortBy, sortType];
    } else if (sortBy.includes('tariff.')) {
      sort = [Tariff, sortBy.split('.').pop(), sortType];
      console.log(sort);
    } else if (sortBy.includes('user_account.')) {
      sort = [UserAccount, sortBy.split('.').pop(), sortType];
      console.log(sort);
    } else if (sortBy.includes('ckassa_payment_status.')) {
      sort = [PaymentStatus, sortBy.split('.').pop(), sortType];
      console.log(sort);
    }

    const queryOptions = {
      where: searchCriteria,
      include: includeOptions,
      attributes: {
        exclude: [
          'id_tariff',
          'id_user_account',
          'id_company',
          'id_ckassa_payment_status',
        ],
      },
      /* order: [[sortBy, sortType]], */
      order: [sort],
      raw: false,
      schema,
    };

    if (usePagination) {
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    payments = await PaymentInfo.findAndCountAll(queryOptions);

    return res.json(payments);
  }

  async getOne(req, res) {
    const schema = 'account';
    const { id } = req.params;

    const searchCriteria = { id };

    const queryOptions = {
      where: searchCriteria,
      schema,
    };

    const payment = await PaymentInfo.findOne(queryOptions);

    return res.json(payment);
  }

  async update(req, res) {
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

    await PaymentInfo.update(
      {
        [property]: value,
      },
      {
        where: { id },
        schema,
      }
    );

    const updatedPayment = await PaymentInfo.findOne(queryOptions);

    console.log(updatedPayment);

    return res.json(updatedPayment);
  }

  async delete(req, res) {
    const schema = 'account';
    const { payments } = req.body;
    let ids = [];
    payments.forEach((item) => {
      ids.push(item.id);
    });

    await PaymentInfo.destroy({ where: { id: ids }, schema });

    return res.json({ message: 'Удаление произведено успешно.' });
  }
}

export default paymentController;
