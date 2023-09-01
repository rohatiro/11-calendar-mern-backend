const express = require("express");
const { validationResult } = require("express-validator");

const loginUsuario = (req = express.request, res = express.response) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.json({
        ok: true,
        message: "login",
        email,
        password,
    });
};

const crearUsuario = (req = express.request, res = express.response) => {
    const { name, email, password } = req.body;

    // if(name.length < 5) {
    //     return res.status(400).json({
    //         ok: false,
    //         message: "El nombre debe de ser de 5 letras"
    //     });
    // }

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        message: "new",
        name,
        email,
        password
    });
};

const revalidarToken = (req, res) => {
    res.json({
        ok: true,
        message: "renew"
    });
};

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken,
};