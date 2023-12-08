import {
  PaymentInfo,
  PaymentStatus,
  UserAccount,
  Tariff,
  Company,
  Currency,
} from '../models/models.js';

class PaymentController {
  async getAll(req, res) {
    const accountSchema = 'account';
    let { limit, page } = req.query;
    limit = limit || 10;
    page = page || 1;
    const offset = page * limit - limit;
    let payments;

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
      raw: true,
      accountSchema,
    });

    return res.json(payments);
  }
  async getOne(req, res) {}
}

export default PaymentController;
