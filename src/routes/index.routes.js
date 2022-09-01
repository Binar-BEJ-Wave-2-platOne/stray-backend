const express = require('express');
const app = express();

const hello = require('../routes/hello.routes');
const items = require('../routes/items.routes');
const auth = require('../routes/auth.routes');
const promos = require('../routes/promos.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.group('/api/v1', (router) => {
  router.use('/', hello);
  router.use('/items', items);
  router.use('/auth', auth);
  router.use('/promos', promos)
});

module.exports = app;
