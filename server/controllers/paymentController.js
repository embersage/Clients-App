import { PaymentInfo } from '../models/models.js';

class PaymentController {
  async getAll(req, res) {
    const payments = await PaymentInfo.findAll();
    return res.json(payments);
  }
  async getOne(req, res) {}
}

export default PaymentController;
