const express = require('express');
const jsonParser = require('body-parser').json;

const app = express();

app.use(jsonParser());

app.use((req, res, next) => {
  console.log(`Testing middleware ${req.query.times} times!`);
  next();
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Web server listening on: ${port}`);
});
