const express = require('express');
const router = express.Router();
const { cadastro, login, getMe } = require('../controllers/authController');
const { proteger } = require('../middlewares/auth');

// Rotas públicas
router.post('/cadastro', cadastro);
router.post('/login', login);

// Rotas protegidas
router.get('/me', proteger, getMe);

module.exports = router;
