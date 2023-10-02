const createError = require('http-errors');
const Paciente = require('../models/paciente')

// listado de pacientes
async function listar(req, res, next) {
    return res.sendStatus(200)
}

// encuentra paciente por su id
async function encontrar(req, res, next) {
    res.sendStatus(200)
}

// crear paciente
async function crear(req, res, next) {
    res.sendStatus(200)
}

// actualizar paciente
async function actualizar(req, res, next) {
    res.sendStatus(200)
}

// eliminar una paciente
async function eliminar(req, res, next) {
    res.sendStatus(200)
}

module.exports = {
    listar,
    crear,
    actualizar,
    eliminar,
    encontrar
};
