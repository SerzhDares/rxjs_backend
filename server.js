const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Router = require('koa-router');
const MessagesGenerator = require('./MessagesGenerator.js');


const app = new Koa();

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(cors({
    origin(ctx) {
      return ctx.get('Origin') || '*';
    },
  })
);

const router = new Router();

router.get('/messages/unread', async (ctx) => {
  ctx.response.body = new MessagesGenerator().createMessage();
})

app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());
const port = process.env.port || 7070;
server.listen(port, (err) => {
  if(err) {
    console.log(err);
  }

  console.log('Server is listening to port ' + port);
})