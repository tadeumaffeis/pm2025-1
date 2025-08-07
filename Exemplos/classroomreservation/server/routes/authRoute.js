const express = require('express');
const router = express.Router();
const {
    loginAuth,
    verifyAuth,
    checkAuth
} = require('../controller/authController');

// Listar todos os cursos
router.post('/login', loginAuth);

// Inserir um novo curso na view
router.post('/verify', checkAuth, verifyAuth);

module.exports = router;