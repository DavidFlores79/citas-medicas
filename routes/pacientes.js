const express = require('express');
const router = express.Router();
const pacientesMW = require('../middlewares/pacientes')
const {
  uuidParamValidator
} = require('../middlewares/validators');

router.get('/', pacientesMW.listar);

router.post('/', pacientesMW.crear);

router.patch('/:id', uuidParamValidator, pacientesMW.actualizar);

router.delete('/:id', uuidParamValidator, pacientesMW.eliminar);

router.get('/:id', uuidParamValidator, pacientesMW.encontrar);

module.exports = router;
