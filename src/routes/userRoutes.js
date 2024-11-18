const express = require('express');
const { signup, login, getAllUsers } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas de autenticação
router.post('/signup', signup);
router.post('/login', login);

// Rota protegida para listar usuários
router.get('/users', authenticateToken, getAllUsers);

module.exports = router;

