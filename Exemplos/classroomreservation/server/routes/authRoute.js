const express = require('express');
const router = express.Router();
const {
    login,
    verify
} = require('../controller/authController');

// Listar todos os cursos
router.get('/login', loginAuth);

// Inserir um novo curso na view
router.post('/verify', verifyAuth);

module.exports = router;