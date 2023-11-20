import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Company, Role, UserAccount } from '../models/models.js';
import ApiError from '../error/ApiError.js';

const generateJwt = (id, email, id_role) => {
  return jwt.sign({ id, email, id_role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.id_role);
    return res.json({ token });
  }

  async getAll(req, res) {
    let { name, limit, page } = req.query;
    limit = limit || 10;
    page = page || 1;
    const offset = page * limit - limit;
    let users;

    if (!name) {
      users = await UserAccount.findAndCountAll({
        include: [
          {
            model: Role,
            attributes: ['name'],
          },
          {
            model: Company,
            attributes: ['name'],
          },
        ],
        attributes: {
          exclude: ['id_role', 'id_company'],
        },
        limit,
        offset,
        raw: true,
      });
    }

    if (name) {
      users = await UserAccount.findAndCountAll({
        where: { name: { [Op.iLike]: `${name}%` } },
        include: [
          {
            model: Role,
            attributes: ['name'],
          },
          {
            model: Company,
            attributes: ['name'],
          },
        ],
        attributes: {
          exclude: ['id_role', 'id_company'],
        },
        limit,
        offset,
        raw: true,
      });
    }

    users = users.rows.map((item) => {
      const role = item['role.name'];
      const company = item['company.name'];

      return {
        id: item.id,
        name: item.name,
        email: item.email,
        password: item.password,
        activate: item.activate,
        activate_code: item.activate_code,
        date_reg: item.date_reg,
        phone: item.phone,
        vk: item.vk,
        yandex: item.yandex,
        temporary: item.temporary,
        date_last_login: item.date_last_login,
        email_status: item.email_status,
        role,
        company,
      };
    });

    return res.json(users);
  }

  async getOne(req, res) {
    const { id } = req.params;

    const user = await UserAccount.findOne({
      where: { id },
      include: [
        {
          model: Role,
          attributes: ['name'],
        },
        {
          model: Company,
          attributes: ['name'],
        },
      ],
      attributes: {
        exclude: ['id_role', 'id_company'],
      },
      raw: true,
    });

    const role = user['role.name'];
    const company = user['company.name'];

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      activate: user.activate,
      activate_code: user.activate_code,
      date_reg: user.date_reg,
      phone: user.phone,
      vk: user.vk,
      yandex: user.yandex,
      temporary: user.temporary,
      date_last_login: user.date_last_login,
      email_status: user.email_status,
      role,
      company,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
      email,
      password,
      activate,
      activate_code,
      date_reg,
      phone,
      vk,
      yandex,
      temporary,
      date_last_login,
      email_status,
      role,
      company,
    } = req.body;

    const user = await UserAccount.update(
      {
        name,
        email,
        password,
        activate,
        activate_code,
        date_reg,
        phone,
        vk,
        yandex,
        temporary,
        date_last_login,
        email_status,
        role,
        company,
      },
      { where: { id } }
    );

    return res.json(user);
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await UserAccount.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Неверный логин или пароль.'));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Неверный логин или пароль.'));
    }
    const token = generateJwt(user.id, user.email, user.id_role);
    return res.json({ token });
  }
}

export default UserController;
