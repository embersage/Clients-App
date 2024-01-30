import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import exceljs from 'exceljs';
import { accountSchema, presentationSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { UserAccount, Company, AccessLevel, Role, UserConfig, Tariff } =
  accountSchema;
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
    let {
      usePagination,
      limit,
      page,
      sortBy,
      sortType,
      search,
      activate,
      autoPayment,
    } = req.query;
    usePagination =
      usePagination === (undefined || '') ? true : usePagination === 'true';
    limit = limit || 10;
    page = page || 1;
    sortBy = sortBy || 'id';
    sortType = sortType || 'ASC';
    search = search || '';
    activate = activate || null;
    autoPayment = autoPayment || null;
    const offset = page * limit - limit;

    const includeOptions = [
      {
        model: Company,
        attributes: ['name'],
      },
      {
        model: AccessLevel,
        attributes: ['name'],
      },
      {
        model: UserConfig,
        attributes: ['auto_payment'],
      },
    ];
    let users = [];
    let searchCriteria = {};

    if (autoPayment) {
      includeOptions[2].where = { auto_payment: autoPayment };
    }

    if (search) {
      if (!isNaN(search)) {
        searchCriteria = {
          id: parseInt(search),
        };
      } else {
        searchCriteria = {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }
    }

    if (activate) {
      searchCriteria.activate = activate;
    }

    const queryOptions = {
      where: searchCriteria,
      include: includeOptions,
      attributes: {
        exclude: ['id_company', 'id_access_level'],
      },
      order: [[sortBy, sortType]],
      raw: false,
      schema,
    };

    if (usePagination) {
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    users = await UserAccount.findAndCountAll(queryOptions);

    return res.json(users);
  }

  async getOne(req, res) {
    const schema = 'account';
    const { id } = req.params;
    let { sortBy, sortType } = req.query;
    sortBy = sortBy || 'id';
    sortType = sortType || 'ASC';

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
          model: UserConfig,
          attributes: ['language', 'usage_format', 'auto_payment'],
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
      order: [[Presentation, sortBy, sortType]],
      schema,
    });

    return res.json(user);
  }

  async update(req, res) {
    const schema = 'account';
    const { id } = req.params;
    const { data } = req.body;
    const property = Object.keys(data)[0];
    const value = Object.values(data)[0];

    await UserAccount.update(
      {
        [property]: value,
      },
      {
        where: { id },
        schema,
      }
    );

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
          model: UserConfig,
          attributes: ['language', 'usage_format', 'auto_payment'],
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

    return res.json(user);
  }

  async delete(req, res) {
    const schema = 'account';
    const { users } = req.body;
    let ids = [];
    users.forEach((item) => {
      ids.push(item.id);
    });
    await UserAccount.destroy({ where: { id: ids }, schema });

    return res.json({ message: 'Удаление произведено успешно.' });
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
