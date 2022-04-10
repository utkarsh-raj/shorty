const { DynamicPool } = require('node-worker-threads-pool');
require('dotenv').config();
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import v1Routes from './routes/v1';

const uri = process.env.MONGO_URI;

const app: Express = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.dynamicPool = new DynamicPool(4);

app.use('/v1', v1Routes);

app.listen(port, () => {
  console.log(`[api]: Server is running on ${port}`);
});
