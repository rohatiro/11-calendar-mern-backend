const { response } = require("express")
const jwt = require("jsonwebtoken")

const validarJWT = (req, res = response, next) => {
    // header: x-token

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            message: "No hay token en la petición",
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_SEED
        );

        req.uid = payload.uid;
        req.name = payload.name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: "Token no valido",
        });
    }

    next();
}

module.exports = {
    validarJWT
}