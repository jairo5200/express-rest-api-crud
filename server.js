const express = require('express');
const {config} = require('./config/config');
const morgan = require('morgan');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


// inciializamos una aplicacion en express
const app = express();

// creamos la constante port con el valor dado en el .env en caso de no haber se elige el 3000 por defecto
const port = config.port || 3000;

// le decimos a la api que vamos a usar formato json
app.use(express.json());
app.use(cookieParser());

app.use((req,res,next) => {
    const token = req.cookies.access_token;
    let data = null;
    req.session = {user: null};
    try {
        data = jwt.verify(token, config.secretKey);
        req.session.user = data;
    } catch (error) {
        req.session.user = null;
    }
    next(); 
})



// usamos morgan para los logs de la api
app.use(morgan('dev'));



routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


// hacemos que nuestra api escuche por el puerto definido
app.listen(port);
// mostramos en consola por que puerto esta escuchando la api
console.log(` server listen on port: ${port}`);


