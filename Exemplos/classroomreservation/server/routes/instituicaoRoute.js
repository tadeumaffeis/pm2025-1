const express = require('express');
const router = express.Router();
const { inserirInstituicao, 
    listarInstituicao, 
    removerInstituicao, 
    atualizarInstituicao 
} = require('../controller/instituicaoController');
const {
    checkAuth
} = require('../controller/authController');

// Listar todos os cursos
router.get('/listar', listarInstituicao);

// Inserir um novo curso na view
router.post('/inserir', checkAuth,inserirInstituicao);

// Inserir um novo curso na view
router.put('/atualizar/:id', checkAuth,atualizarInstituicao);

// Inserir um novo curso na view
router.delete('/remover/:id', checkAuth, removerInstituicao)

module.exports = router;

