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
    const accountSchema = 'account';
    let { name, limit, page } = req.query;
    limit = limit || 10;
    page = page || 1;
    const offset = page * limit - limit;
    let payments;

    if (!name) {
      payments = await PaymentInfo.findAndCountAll({
        include: [
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
        ],
        attributes: {
          exclude: [
            'id_tariff',
            'id_user_account',
            'id_company',
            'id_currency',
            'id_ckassa_payment_status',
          ],
        },
        limit,
        offset,
        order: [['id', 'ASC']],
        raw: true,
        accountSchema,
      });
    }

    if (name) {
      payments = await PaymentInfo.findAndCountAll({
        include: [
          {
            model: Tariff,
            attributes: ['id', 'name'],
          },
          {
            model: UserAccount,
            where: {
              [Op.or]: {
                name: { [Op.iLike]: `%${name}%` },
              },
            },
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
        ],
        attributes: {
          exclude: [
            'id_tariff',
            'id_user_account',
            'id_company',
            'id_currency',
            'id_ckassa_payment_status',
          ],
        },
        limit,
        offset,
        order: [['id', 'ASC']],
        raw: true,
        accountSchema,
      });
    }

    return res.json(payments);
  }
}

export default PaymentController;
