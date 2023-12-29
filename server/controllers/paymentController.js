import { Op } from 'sequelize';
import { accountSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';
import formatDate from '../utils/formatDate.js';

const { PaymentInfo, PaymentStatus, UserAccount, Tariff, Company, Currency } =
  accountSchema;

class PaymentController {
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

    payments.rows = payments.rows.map((payment) => {
      payment.date_start = formatDate(payment.date_start);
      payment.date_end = formatDate(payment.date_end);
      return payment;
    });

    return res.json(payments);
  }
  async getOne(req, res) {}
}

export default PaymentController;
