'use strict'

var express = require('express');
var app = express();

var port = process.env.port || 3000;

app.listen(port, function () {
  console.log(`Web server listening on: ${port}`)
});