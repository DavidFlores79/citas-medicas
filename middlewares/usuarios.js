const createError = require('http-errors');
const Usuario = require('../models/usuario')

// registrar usuario nuevo
async function crear(req, res, next) {
    try {
        const { username, password } = req.body;
        let usuario = new Usuario({ username })
        console.log({ usuario });
        usuario.generaSaltYHash(password)
        await usuario.save();
        return res.json(usuario)
    } catch (error) {
        return next(error);
    }
}

function login(req, res, next) {
    if (req.user) {
        console.log('req user', req.user);
        return res.sendStatus(200);
    }
    next(createError(404));
}

module.exports = {
    crear,
    login
};