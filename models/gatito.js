const mongoose = require('mongoose');

const nombreModelo = 'Gatito';

// define schema
const schemaDef = {
    bigotes: Number,
    _idHumano: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String,
        default: '',
    },
    ternurometro: {
        type: Number,
        min: 0,
        max: 10
    },
    juguetesFavoritos: [ String ],
    pelaje: {
        color: String,
        largo: String,
    },
    lugaresFavoritos : [
        {
            nombre: String,
            momentoDelDia: String,
        }
    ],
};

// opciones del schema
const schemaOpts = {
    methods: {
        saluda() {
            return `Hola. Me llamo ${this.nombre}`
        },

    },
    statics: {
        encuentraPorNombre (nombre) {
            return mongoose.model(nombreModelo).find({nombre: new RegExp(nombre, 'i')})
        }
    }
};

// crear el schema 
const schema = new mongoose.Schema(schemaDef, schemaOpts);

// crear modelo 
const Gatito = mongoose.model(nombreModelo, schema, 'gatitos');

module.exports = Gatito;