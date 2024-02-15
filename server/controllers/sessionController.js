import { Op } from 'sequelize';
import { sessionSchema, presentationSchema } from '../models/index.js';
import ApiError from '../error/ApiError.js';

const { Session, SessionUser, SessionUserInfo } = sessionSchema;
const { Presentation } = presentationSchema;

class sessionController {
  async getAll(req, res) {
    const schema = 'session';
    let { usePagination, limit, page, sortBy, sortType, search } = req.query;
    usePagination =
      usePagination === (undefined || '') ? true : usePagination === 'true';
    limit = limit || 10;
    page = page || 1;
    sortBy = sortBy || 'id';
    sortType = sortType || 'ASC';
    search = search || '';
    const offset = page * limit - limit;
    let searchCriteria = {};

    if (search) {
      searchCriteria = { code: { [Op.iLike]: `%${search}%` } };
    }

    const includeOptions = [
      {
        model: SessionUser,
        include: [SessionUserInfo],
      },
      {
        model: Presentation,
      },
    ];

    const queryOptions = {
      where: searchCriteria,
      order: [[sortBy, sortType]],
      include: includeOptions,
      distinct: true,
      schema,
    };

    if (usePagination) {
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    const sessions = await Session.findAndCountAll(queryOptions);

    return res.json(sessions);
  }
}

export default sessionController;
