import 'reflect-metadata';
require('dotenv').config();
import { createConnection } from 'typeorm';
import router from './routers';
import cors from 'cors';
import express from 'express';
import ErrorMiddleware from './middleware/error.middleware';
import cookieParser from 'cookie-parser';

const start = async () => {
  const conn = await createConnection();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', router);
  app.use(ErrorMiddleware);

  app.listen(process.env.PORT, () => {
    console.log('Server started on port', process.env.PORT);
    console.log('http://localhost:' + process.env.PORT);
  });
};

start().catch((err) => console.log(err));
