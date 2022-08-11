const express = require('express');
const app = express();

const hello = require('../routes/hello.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.group('/api/v1', (router) => {
  router.use('/', hello);
});

module.exports = app;
