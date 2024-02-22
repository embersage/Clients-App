import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import sequelize from './db.js';

config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is working on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
