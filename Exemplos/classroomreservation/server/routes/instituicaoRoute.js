const express = require('express');
const router = express.Router();
const { inserirInstituicao, 
    listarInstituicao, 
    removerInstituicao, 
    atualizarInstituicao 
} = require('../controller/instituicaoController');

// Listar todos os cursos
router.get('/listar', listarInstituicao);

// Inserir um novo curso na view
router.post('/inserir', inserirInstituicao);

// Inserir um novo curso na view
router.put('/atualizar/:id', atualizarInstituicao);

// Inserir um novo curso na view
router.delete('/remover/:id', removerInstituicao)

module.exports = router;

