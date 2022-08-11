require('dotenv').config();
require('express-group-routes');

const {
  notFound,
  error,
} = require('./src/middlewares/errorHandling.middleware');
const routes = require('./src/routes/index.routes');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(routes);
app.use('*', notFound);
app.use(error);

app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});
