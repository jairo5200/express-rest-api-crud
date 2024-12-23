const express = require('express');
const {config} = require('./config/config');
const morgan = require('morgan');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');


// inciializamos una aplicacion en express
const app = express();

// creamos la constante port con el valor dado en el .env en caso de no haber se elige el 3000 por defecto
const port = config.port || 3001;



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

// Personalizamos el formato de morgan para incluir el email
morgan.token('email', (req, res) => {
    // validamos que exista una session de usuario en caso contrario enviaremos no logeado
    return req.session.user && req.session.user.email ? req.session.user.email : 'no logeado';
});


// Personalizamos el formato de morgan para incluir el email
morgan.format('custom', ':date - :method - :url - :status - :response-time ms - :res[content-length] - :email');



// Configura morgan para usar el formato personalizado
app.use(morgan('custom', {
  stream: {
    write: (log) => {
    enviar(log.trim());  // Enviar el log a la función que enviara la ifnormacion a la api de logs
    }
  },
  skip: (req, res) => false,
}));


async function enviar(data){
    const info =data.split('-');
    body = {
        "email": info[6].trim(),
        "date": info[0].trim(),
        "method": info[1].trim(),
        "url": info[2].trim(),
        "status": info[3].trim(),
        "responseTime": info[4].trim(),
        "contentLength": info[5].trim(),
    }
      axios.post("http://localhost:3002/api/v0/logs", body)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
}

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


// hacemos que nuestra api escuche por el puerto definido
app.listen(port);
// mostramos en consola por que puerto esta escuchando la api
console.log(` server listen on port: ${port}`);


