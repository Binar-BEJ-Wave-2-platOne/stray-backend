const express = require('express');
const app = express();


const items = require('../routes/items.routes');
const orderitems = require('../routes/orderitems.routes')
const auth = require('../routes/auth.routes');
const payments = require('../routes/payments.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.group('/api/v1', (router) => {
  router.use('/payments', payments);
  router.use('/items', items);
  router.use('/orderitems', orderitems);
  router.use('/auth', auth);
  
});

module.exports = app;
