import ApiError from '../error/ApiError.js';

class UserController {
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest('Id не определен.'));
    }
    res.json(id);
  }
  async login(req, res) {}
  async create(req, res) {}
  async getOne(req, res) {}
  async getAll(req, res) {}
}

export default UserController;
