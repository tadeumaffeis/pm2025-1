const express = require('express');
const router = express.Router();
const {
    loginAuth,
    verifyAuth
} = require('../controller/authController');

// Listar todos os cursos
router.post('/login', loginAuth);

// Inserir um novo curso na view
router.post('/verify', verifyAuth);

module.exports = router;