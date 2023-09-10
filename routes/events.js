/*
    Events Routes
    host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerEventos, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { fieldValidator } = require("../middlewares/field-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");
const router = Router();

// Todas las rutas deben de pasar por la validación del JWT

// Obtener todos los eventos
// GET

router.use(validarJWT);

router.get(
    '/',
    obtenerEventos,
);

// Crear un nuevo evento
// POST

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        fieldValidator,
    ],
    crearEvento,
);

// Actualizar Evento
// PUT

router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        fieldValidator,
    ],
    actualizarEvento,
);

// Borrar Evento
// DELETE

router.delete(
    '/:id',
    borrarEvento,
);

module.exports = router;