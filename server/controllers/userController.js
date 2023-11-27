import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AccessLevel, Role, Company, UserAccount } from '../models/models.js';
import ApiError from '../error/ApiError.js';

const generateJwt = (id, email, id_access_level) => {
  return jwt.sign({ id, email, id_access_level }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async check(req, res, next) {
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.id_access_level
    );
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
            model: Company,
            attributes: ['name'],
          },
          {
            model: AccessLevel,
            attributes: ['name'],
          },
        ],
        attributes: {
          exclude: ['id_company', 'id_access_level'],
        },
        limit,
        offset,
        raw: true,
      });
    }

    if (name) {
      users = await UserAccount.findAndCountAll({
        where: {
          [Op.or]: {
            name: { [Op.iLike]: `%${name}%` },
            email: { [Op.iLike]: `%${name}%` },
          },
        },
        include: [
          {
            model: Company,
            attributes: ['name'],
          },
          {
            model: AccessLevel,
            attributes: ['name'],
          },
        ],
        attributes: {
          exclude: ['id_company', 'id_access_level'],
        },
        limit,
        offset,
        raw: true,
      });
    }
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
        {
          model: AccessLevel,
          attributes: ['name'],
        },
      ],
      attributes: {
        exclude: ['id_company', 'id_role', 'id_access_level'],
      },
      raw: true,
    });

    return res.json(user);
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
      company,
      access_level,
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
        company,
        access_level,
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
    if (user.id_access_level !== 1) {
      const token = generateJwt(user.id, user.email, user.id_access_level);
      return res.json({ token });
    }
    return res.json(null);
  }
}

export default UserController;
