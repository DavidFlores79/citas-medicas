const express = require('express');
const router = express.Router();
const citasMW = require('../middlewares/citas')
const {
  uuidParamValidator
} = require('../middlewares/validators');

router.get('/', citasMW.listar);

router.post('/', citasMW.crear);

router.patch('/:id', uuidParamValidator, citasMW.actualizar);

router.delete('/:id', uuidParamValidator, citasMW.eliminar);

router.get('/:id', uuidParamValidator, citasMW.encontrar);

module.exports = router;
