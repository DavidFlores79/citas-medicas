const express = require('express');
const router = express.Router();
const passport = require('passport');
const { crear, login } = require('../middlewares/usuarios')
const {
  registraUsuarioValidator
} = require('../middlewares/validators');

router.post('/', registraUsuarioValidator, crear);

router.post('/login', registraUsuarioValidator, passport.authenticate('local'), login)

module.exports = router;
