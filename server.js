const express = require('express');
const {config} = require('./config/config');
const morgan = require('morgan');
const routerApi = require('./routes');

// inciializamos una aplicacion en express
const app = express();

// creamos la constante port con el valor dado en el .env en caso de no haber se elige el 3000 por defecto
const port = config.port || 3000;

// hacemos que nuestra api escuche por el puerto definido
app.listen(port);
// mostramos en consola por que puerto esta escuchando la api
console.log(` server listen on port: ${port}`);

// usamos mrgan para los logs de la api
app.use(morgan('dev'));
// le decimos a la api que use formato json
app.use(express.json());


routerApi(app);




