const express = require("express");
require('dotenv').config();

const app = express();

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