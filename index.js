const express = require('express');
const createError = require('http-errors');
const cors = require('cors')
const helmet = require('helmet');
const morgan = require('morgan');
const citasRouter = require('./routes/citas')
const pacientesRouter = require('./routes/pacientes');

const app = express();

// configurar middlewares
app.use(helmet());                     // seguridad básica en encabezados
app.use(morgan(process.env.LOG_LEVEL)) // logger de actividad de API
app.use(cors());                       // permitir peticiones de otros dominios
app.use(express.json())                // recibir peticiones con payload JSON

// definir rutas
app.use('/', async (req, res, next) => {
  const Gatito = require('./models/gatito');
  const pelusa = await Gatito.create({nombre: 'Pelusa', bigotes: 10});

  res.json({
    saludo: pelusa.saluda(),
    encontrado: await Gatito.encuentraPorNombre('pelusa')
  })
});
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
