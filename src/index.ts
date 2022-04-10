const { DynamicPool } = require('node-worker-threads-pool');

import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import v1Routes from './routes/v1';

const app: Express = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
global.dynamicPool = new DynamicPool(4);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/v1', v1Routes);

app.listen(port, () => {
  console.log(`[api]: Server is running on ${port}`);
});