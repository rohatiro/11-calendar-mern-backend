const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { dbConnection } = require("./database/config");

const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
// TODO auth, create, login, renew
// TODO CRUD de eventos
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
});