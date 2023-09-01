const express = require("express");
require('dotenv').config();

const app = express();

// Directorio publico
app.use( express.static('public') );

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
});