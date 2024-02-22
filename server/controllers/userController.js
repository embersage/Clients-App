import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import exceljs from 'exceljs';
import { accountSchema, presentationSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';
import PaymentInfo from '../models/account/PaymentInfo.js';

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
      endSoon,
      autoPayment,
      hasFreeTariff,
      hasSubscription,
    } = req.query;
    usePagination =
      usePagination === (undefined || '') ? true : usePagination === 'true';
    endSoon = endSoon === (undefined || '') ? true : endSoon === 'true';
    limit = limit || 10;
    page = page || 1;
    sortBy = sortBy || 'id';
    sortType = sortType || 'ASC';
    search = search || '';
    activate = activate || null;
    autoPayment = autoPayment || null;
    hasFreeTariff =
      hasFreeTariff === (undefined || '') ? true : hasFreeTariff === 'true';
    hasSubscription =
      hasSubscription === (undefined || '') ? true : hasSubscription === 'true';
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
      {
        model: PaymentInfo,
        include: [
          {
            model: Tariff,
          },
        ],
      },
    ];

    if (endSoon) {
      const currentDate = new Date();

      includeOptions[3].where = {
        date_end: {
          [Op.between]: [
            currentDate,
            new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000),
          ],
        },
      };
    }

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

    if (hasSubscription) {
      includeOptions[3].where = {
        id_tariff: { [Op.ne]: 5 },
        date_end: {
          [Op.gt]: new Date(),
        },
      };
    }

    let sort;

    if (!sortBy.includes('.')) {
      sort = [sortBy, sortType];
    } else if (sortBy.includes('company.')) {
      sort = [Company, sortBy.split('.').pop(), sortType];
    }

    const queryOptions = {
      where: searchCriteria,
      include: includeOptions,
      attributes: {
        exclude: ['id_company', 'id_access_level'],
      },
      order: [sort],
      raw: false,
      distinct: true,
      schema,
    };

    if (usePagination) {
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    if (!hasFreeTariff) {
      users = await UserAccount.findAndCountAll(queryOptions);
      return res.json(users);
    } else {
      queryOptions.limit = null;
      queryOptions.offset = null;
      users = await UserAccount.findAll(queryOptions);

      const filteredUsers = users.filter((user) => {
        const hasOneTariff =
          user.payment_infos.length === 1 &&
          user.payment_infos[0].id_tariff === 5;

        let allOtherTariffsExpired;

        if (!hasOneTariff) {
          allOtherTariffsExpired =
            user.payment_infos.length > 1 &&
            user.payment_infos.some((payment) => {
              return (
                payment.id_tariff !== 5 &&
                new Date(payment.date_end) <= new Date()
              );
            });
        }

        return hasOneTariff || allOtherTariffsExpired;
      });

      if (usePagination) {
        const start = (page - 1) * limit;
        const end = start + limit;

        const paginatedUsers = filteredUsers.slice(start, end);
        return res.json({ count: filteredUsers.length, rows: paginatedUsers });
      } else {
        return res.json({ count: filteredUsers.length, rows: filteredUsers });
      }
    }
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
          model: PaymentInfo,
          include: [
            {
              model: Tariff,
            },
          ],
        },
        {
          model: Presentation,
          attributes: ['id', 'name', 'description'],
        },
      ],
      attributes: {
        exclude: ['id_company', 'id_role', 'id_access_level'],
      },
      distinct: true,
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

    if (property === 'password') {
      const hashPassword = await bcrypt.hash(value, 5);
      await UserAccount.update(
        {
          [property]: hashPassword,
        },
        {
          where: { id },
          schema,
        }
      );
    } else {
      await UserAccount.update(
        {
          [property]: value,
        },
        {
          where: { id },
          schema,
        }
      );
    }

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

      worksheet.eachRow(async (row, rowNumber) => {
        if (rowNumber !== 1) {
          const name = row.getCell(1).value;
          const email = row.getCell(2).value.text;
          const password = `${row.getCell(3).value}`;
          const id_tariff = row.getCell(4).value;
          const date_start = row.getCell(5).value || new Date().toISOString();
          const date_end = row.getCell(6).value;
          const auto_payment = row.getCell(7).value || false;
          const language = row.getCell(8).value || 'ru-Ru';
          const amount =
            row.getCell(9).value !== undefined ? row.getCell(9).value : 0;

          const hashPassword = await bcrypt.hash(password, 5);

          const userAccount = await UserAccount.create({
            name,
            email,
            password: hashPassword,
          });

          await UserConfig.create({
            id_user_account: userAccount.id,
            auto_payment,
            language,
          });

          await PaymentInfo.create({
            id_user_account: userAccount.id,
            id_tariff: 5,
            date_start,
            date_end: new Date(date_start).setFullYear(
              new Date(date_start).getFullYear() + 100
            ),
            amount: 0,
          });

          if (id_tariff) {
            await PaymentInfo.create({
              id_user_account: userAccount.id,
              id_tariff,
              date_start: new Date(date_start).setSeconds(
                new Date(date_start).getSeconds() + 1
              ),
              date_end,
              auto_payment,
              amount,
            });
          }
        }
      });

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
