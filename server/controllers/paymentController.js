import { Op } from 'sequelize';
import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { PaymentInfo, PaymentStatus, UserAccount, Tariff, Company, Currency } =
  accountSchema;

class PaymentController {
  /* TODO
    - по сумме подписки
    - по тарифу
    - по валюте */
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
      tariff,
      currency,
    } = req.query;
    usePagination =
      usePagination === (undefined || '') ? true : usePagination === 'true';
    limit = limit || 10;
    page = page || 1;
    sortBy = sortBy || 'id';
    sortType = sortType || 'ASC';
    search = search || '';
    amount = amount || '';
    tariff = tariff || '';
    currency = currency || '';
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
        model: Company,
        attributes: ['name'],
      },
      {
        model: Currency,
        attributes: ['name'],
      },
      {
        model: PaymentStatus,
        attributes: ['name'],
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

    const queryOptions = {
      where: searchCriteria,
      include: includeOptions,
      attributes: {
        exclude: [
          'id_tariff',
          'id_user_account',
          'id_company',
          'id_currency',
          'id_ckassa_payment_status',
        ],
      },
      order: [[sortBy, sortType]],
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
}

export default PaymentController;
