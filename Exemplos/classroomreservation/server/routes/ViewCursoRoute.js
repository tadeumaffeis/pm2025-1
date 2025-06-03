const express = require('express');
const router = express.Router();
const { inserirCurso, listarCursos, atualizarCurso, removerCurso } = require('../controller/viewCursoController');

// Listar todos os cursos
router.get('/listar', listarCursos);
// Inserir um novo curso na view
router.post('/inserir', inserirCurso);

router.put('/atualizar/:id', atualizarCurso);

router.delete('/remover/:id', removerCurso);

module.exports = router;

