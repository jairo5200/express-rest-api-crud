// importamos el modulo de dotenv para poder usar el archivo .env
require('dotenv').config();


// creamos una constante llamada config con todos los valores obtenidos del archivo .env
const config = {
    env: process.env.NODE_ENV ?? 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER ,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbEngine: process.env.DB_ENGINE,
    dbUrl: process.env.POSTGRES_URL,
}

// exportamos la constante config para poder usarla en otros archivos
module.exports = {config};