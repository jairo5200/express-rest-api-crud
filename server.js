const express = require('express');
const config = require('./config/config');
const morgan = require('morgan');
const routerApi = require('./routes');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port);
console.log(` server listen on port: ${port}`);

app.use(morgan('dev'));
app.use(express.json());

routerApi(app);

