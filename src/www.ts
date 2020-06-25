import 'source-map-support/register'; // source-map을 사용하기 위해 추가
import App from './App';
import * as express from 'express';

const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = new App().app;

app
  .listen(port, () => console.log(`Express server listening at ${port}`))
  .on('error', err => console.error(err));
