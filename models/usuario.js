const mongoose = require('mongoose');
const crypto = require('crypto');
const createError = require('http-errors');

const nombreModelo = 'Usuario';

//define schema
const schemaDef = {
    username: String,
    salt: String, //genera password protegido
    hash: String, //password protegido
};

//opciones del eschema
const schemaOpts = {
    methods: {     // metodos de documento
        async generaSaltYHash(password) { // genera password protegido para este usuario
            const salt = crypto.randomBytes(32).toString('hex');
            const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
            this.salt = salt;
            this.hash = hash;
        },
        validarPassword(password) { // validar que password no protegido genera password protegido
            const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
            return this.hash === hash;
        }
    },
    statics : {
        async verify(username, password, done) { // verificacion para estrategia local de passport
            let usuarioAutenticado = false;
            let error = null;
            try {
                let usuario = await mongoose.model(nombreModelo).findOne({username});
                console.log(usuario.validarPassword(password));
                if (usuario && usuario.validarPassword(password)) {
                    usuarioAutenticado = usuario;
                }
            } catch(e) {
                error = e;
            } finally {
                return done(error, usuarioAutenticado);
            }
        },
        serializeUser(user, done) {
            console.log('serialize!!');
            done(null, user.id)
        },
        async deserializeUser(id, done) {
            console.log('deserialize!!');
            let usuario = undefined;
            let error = undefined;

            try {
                usuario = await mongoose.model(nombreModelo).findById(id);
                error = usuario ? null : createError(404);
            } catch (e) {
                error = e;
            } finally {
                done(error, usuario);
            }
        }
    },
};

// crear el schema 
const schema = new mongoose.Schema(schemaDef, schemaOpts);

// crear modelo 
const Usuario = mongoose.model(nombreModelo, schema, 'usuarios');

module.exports = Usuario;
