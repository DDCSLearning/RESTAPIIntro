const express = require('express');
const jsonParser = require('body-parser').json;
const routes = require('./routes');

const app = express();

app.use(jsonParser());
app.use('/questions', routes);


const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Web server listening on: ${port}`);
});
