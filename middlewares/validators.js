const createError = require('http-errors');
const { param, body, validationResult } = require('express-validator');

function crearErrorOContinuar(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(createError(400));
    }
    return next();
}

module.exports = {
    uuidParamValidator: [
        param('id').trim().escape().isUUID(),
        crearErrorOContinuar
    ],
    registraUsuarioValidator: [
        body('username').trim().escape().notEmpty().isEmail(),
        body('password').trim().escape().notEmpty().isString(),
        crearErrorOContinuar
    ]
}
