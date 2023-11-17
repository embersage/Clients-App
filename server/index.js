import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import errorHandler from './middleware/ErrorHandlingMiddleware.js';
import sequelize from './db.js';
import {
  UserAccount,
  UserConfig,
  Role,
  RefreshToken,
  Company,
  UserGroup,
  GroupMember,
  GroupAccount,
  PaymentInfo,
  PaymentStatus,
  Currency,
  Tariff,
  TariffDescription,
  FirstPay,
  TariffPromocode,
  Promocode,
} from './models/models.js';

config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Everything is working!' });
});

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
