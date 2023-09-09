const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");

const loginUsuario = async (req = express.request, res = express.response) => {
    const { email, password } = req.body;

    try {
        let usuario = await User.findOne({ email });

        if(!usuario) {
            return res.status(400).json({
                ok: false,
                message: "El usuario no existe con ese email",
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                message: "Contraseña Incorrecta",
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            message: "login",
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Por favor hable con el administrador",
        });
    }
};

const crearUsuario = async (req = express.request, res = express.response) => {
    const { name, email, password } = req.body;

    try {
        let usuario = await User.findOne({ email });

        if(usuario) {
            return res.status(400).json({
                ok: false,
                message: "Un usuario existe con ese correo",
            });
        }

        usuario = new User( req.body );
        
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT( usuario.id, usuario.name );
        
        res.status(201).json({
            ok: true,
            message: "new",
            uid: usuario.id,
            name: usuario.name,
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Por favor hable con el administrador",
        });
    }

};

const revalidarToken = async (req, res) => {
    const uid = req.uid;
    const name = req.name;

    // generar un nuevo JWT y retornarlo en esta petición
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        message: "renew",
        token,
    });
};

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken,
};