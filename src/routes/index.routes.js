const express = require('express');
const app = express();

const payments = require('../routes/payments.routes');
const hello = require('../routes/hello.routes');
const items = require('../routes/items.routes');
const orderitems = require('../routes/orderitems.routes')
const auth = require('../routes/auth.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.group('/api/v1', (router) => {
  router.use('/payments', payments);
  router.use('/', hello);
  router.use('/items', items);
  router.use('/orderitems', orderitems);
  router.use('/auth', auth);
});

module.exports = app;
