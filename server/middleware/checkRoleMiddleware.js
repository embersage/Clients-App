import jwt from 'jsonwebtoken';

const checkRoleMiddleware = (id_access_levels) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: 'Пользователь не авторизован.' });
      }
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      if (!id_access_levels.includes(decodedToken.id_access_level)) {
        return res.status(403).json({ message: 'Нет доступа.' });
      }
      req.token = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Пользователь не авторизован.' });
    }
  };
};

export default checkRoleMiddleware;
