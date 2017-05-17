const express = require('express');
const routes = require('./routes');
const app = express();

const jsonParser = require('body-parser').json;
const logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());
app.use('/questions', routes);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Web server listening on: ${port}`);
});
