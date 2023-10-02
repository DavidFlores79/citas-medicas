const express = require('express');
const createError = require('http-errors');
const cors = require('cors')
const helmet = require('helmet');
const session = require('express-session');
const morgan = require('morgan');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');

const usuariosRouter = require('./routes/usuarios');
const citasRouter = require('./routes/citas')
const pacientesRouter = require('./routes/pacientes');
const passport = require('passport');
const Usuario = require('./models/usuario');
const EXPIRACION_COOKIE = 86400000; // milisegundos en un dia


const app = express();

// configurar middlewares
app.use(helmet());                     // seguridad básica en encabezados
app.use(morgan(process.env.LOG_LEVEL)) // logger de actividad de API
app.use(cors());                       // permitir peticiones de otros dominios
app.use(express.json())                // recibir peticiones con payload JSON

//configurar passport
passport.use(new LocalStrategy({}, Usuario.verify));
passport.serializeUser(Usuario.serializeUser);
passport.deserializeUser(Usuario.deserializeUser);

// configurar sesiones en express
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_COOKIE_NAME,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_CONN_STR,
    dbName: process.env.DB_NAME,
    collectionName: 'sesiones'
  }),
  cookie: {
      maxAge: EXPIRACION_COOKIE
  }
}));


// autenticacion
app.use(passport.initialize()); // busca en la sesion el usuario serializado
app.use(passport.session());    // deserializa el usuario y lo guarda en req

// definir rutas
app.use('/usuarios', usuariosRouter);
app.use('/pacientes', pacientesRouter);
app.use('/citas', citasRouter);

// Generar un error 404 para cualquier ruta no definida antes y pasarlo al manejo de errores
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: req.app.get('env') === 'development' ? err : null // solo exponer el error en desarrollo
  });
});

module.exports = app;
