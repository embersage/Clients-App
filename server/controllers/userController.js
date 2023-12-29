import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import exceljs from 'exceljs';
import { accountSchema, presentationSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';
import formatDate from '../utils/formatDate.js';

const { AccessLevel, Role, Company, UserAccount, Tariff } = accountSchema;
const { Presentation } = presentationSchema;

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
    const schema = 'account';
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
        order: [['id', 'ASC']],
        raw: true,
        schema,
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
        order: [['id', 'ASC']],
        raw: true,
        schema,
      });
    }

    users.rows = users.rows.map((user) => {
      user.date_reg = formatDate(user.date_reg);
      user.date_last_login = formatDate(user.date_last_login);
      return user;
    });

    return res.json(users);
  }

  async getOne(req, res) {
    const schema = 'account';
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
        {
          model: Tariff,
          attributes: ['name'],
        },
        {
          model: Presentation,
          attributes: ['id', 'name', 'description'],
        },
      ],
      attributes: {
        exclude: ['id_company', 'id_role', 'id_access_level'],
      },
      schema,
    });

    user.date_reg = formatDate(user.date_reg);
    user.date_last_login = formatDate(user.date_last_login);

    return res.json(user);
  }

  async update(req, res) {
    const schema = 'account';
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
      { where: { id }, schema }
    );

    return res.json(user);
  }

  async import(req, res, next) {
    try {
      const { buffer } = req.file;
      if (!buffer) {
        return next(ApiError.internal('Файл не найден.'));
      }

      const workbook = new exceljs.Workbook();
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];
      const users = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          const nameCell = row.getCell(1);
          const name = nameCell.value;

          if (name !== undefined) {
            users.push({ name });
          } else {
            console.log(
              `Ошибка: Значение name не определено в строке ${rowNumber}.`
            );
          }
        }
      });

      await UserAccount.bulkCreate(users, { schema: 'account' });

      return res.json({ message: 'Клиенты успешно импортированы.' });
    } catch (error) {
      return next(ApiError.internal('Ошибка при импорте клиентов.'));
    }
  }

  async login(req, res, next) {
    const schema = 'account';
    const { email, password } = req.body;
    const user = await UserAccount.findOne({ where: { email }, schema });
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
