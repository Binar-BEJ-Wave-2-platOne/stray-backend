const express = require('express');
const app = express();

const hello = require('../routes/hello.routes');
const items = require('../routes/items.routes');
const orderitems = require('../routes/orderitems.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.group('/api/v1', (router) => {
  router.use('/', hello);
  router.use('/items', items);
  router.use('/orderitems', orderitems);
});

module.exports = app;
