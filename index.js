require('dotenv').config();
require('express-group-routes');

const {
  notFound,
  error,
} = require('./src/middlewares/errorHandling.middleware');
const routes = require('./src/routes/index.routes');
const orderRoutes = require('./src/routes/orders.routes');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/order', orderRoutes);

app.use(routes);
app.use('*', notFound);
app.use(error);

app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});
