import express from 'express';
import next from 'next';
import config from 'config';
import compression from 'compression';
const routes = require('./routes')
const port = parseInt(process.env.PORT, 10) || 3002
const dev = process.env.NODE_ENV !== 'production'
import bodyParser from 'body-parser';
const app = next({ dev })
const handle = routes.getRequestHandler(app)
// import getObjects from './common/request';
// import sendEmail from './common/email';

app.prepare()
.then(() => {
  const server = express();
  // serving static files
  server.use(compression());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.get('*', (req, res) => handle(req, res))
  // server
  server.use(handle).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})