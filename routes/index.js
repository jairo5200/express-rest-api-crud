//importamos express para poder utilizarlo 
const express = require('express');
// importamos el routing de products
const productsRouter = require('./products.router')

// funcion que hace el routing a los diferentes subniveles de la api
function routerApi(app){
    // ruta base de la api
    const router = express.Router();
    // agregamos /api/v0 para poder manejar vesiones en nuestra api
    app.use('/api/v0', router);
    // agregamos el routing de products
    router.use('/products', productsRouter);
}

// exportamos la funcion routerApi para poder utilizarla en otros archivos
module.exports = routerApi;