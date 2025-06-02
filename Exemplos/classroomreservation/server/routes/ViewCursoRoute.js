const express = require('express');
const router = express.Router();
const { inserirCurso, listarCursos, atualizarCurso } = require('../controller/viewCursoController');

// Listar todos os cursos
router.get('/listar', listarCursos);

// Inserir um novo curso na view
router.post('/inserir', inserirCurso);

router.put('/atualizar', atualizarCurso);

module.exports = router;

