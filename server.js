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

// Personalizar el formato de morgan para incluir el email
morgan.token('email', (req, res) => {
    // Asegúrate de que req.user exista antes de acceder a su email
    return req.session.user && req.session.user.email ? req.session.user.email : 'no logeado';
});


// Personaliza el formato de morgan para incluir el email
morgan.format('custom', ':date - :method - :url - :status - :response-time ms - :res[content-length] - :email');



// Configura morgan para usar el formato personalizado
app.use(morgan('custom', {
  stream: {
    write: (log) => {
    enviar(log.trim());  // Enviar el log a tu función personalizada
    }
  },
  skip: (req, res) => false,  // Asegúrate de que morgan no omita el log
}));


function enviar(data){
    const info =data.split('-');
    body = {
        "date": info[0].trim(),
        "method": info[1].trim(),
        "url": info[2].trim(),
        "status": info[3].trim(),
        "response_time": info[4].trim(),
        "content_length": info[5].trim(),
        "email": info[6].trim(),
    }
    console.log(body);
    fetch("http://localhost:3002/api/v0/logs", {
        method: 'POST',  // Especifica que es una solicitud POST
        headers: {
          'Content-Type': 'application/json'  // Especifica que el contenido es JSON
        },
        body: JSON.stringify(body)  // Convierte el objeto a JSON para enviarlo en el cuerpo de la solicitud
      })
        .then(response => response.json())  // Procesa la respuesta como JSON
        .then(data => {
          console.log('Respuesta del servidor:', data);  // Maneja los datos de la respuesta
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);  // Maneja los errores
        });
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


