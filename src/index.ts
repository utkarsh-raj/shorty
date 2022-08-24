const { DynamicPool } = require('node-worker-threads-pool');
require('dotenv').config();
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import errorHandler from './middlewares/errorHandler';
import v1Routes from './routes/v1';
import asyncWrap from './utils/asyncWrap';

const uri = process.env.MONGO_URI;

const app: Express = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.dynamicPool = new DynamicPool(4);

app.use('/v1', v1Routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[api]: Server is running on ${port}`);
});
