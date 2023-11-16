import express from 'express';
import { config } from 'dotenv';
import sequelize from './db.js';

config();

const PORT = process.env.PORT || 5000;

const app = express();

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
