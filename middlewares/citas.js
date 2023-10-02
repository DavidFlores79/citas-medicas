const createError = require('http-errors');
const Cita = require('../models/cita')

// listado de citas
async function listar(req, res, next) {
    return res.sendStatus(200)
}

// encuentra cita por su id
async function encontrar(req, res, next) {
    return res.sendStatus(200)
}

// crear cita
async function crear(req, res, next) {
    return res.sendStatus(200)
}

// actualizar cita
async function actualizar(req, res, next) {
    return res.sendStatus(200)
}

// eliminar una cita
async function eliminar(req, res, next) {
    return res.sendStatus(200)
}

module.exports = {
    listar,
    crear,
    actualizar,
    eliminar,
    encontrar
};
