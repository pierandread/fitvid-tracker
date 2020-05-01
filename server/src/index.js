import Koa from 'koa';
import router from './routes/router.js';

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
