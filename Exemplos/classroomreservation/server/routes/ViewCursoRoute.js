const express = require('express');
const router = express.Router();
const { inserirCurso, listarCursos } = require('../controller/viewCursoController');

// Listar todos os cursos
router.get('/listar', listarCursos);

// Inserir um novo curso na view
router.post('/inserir', inserirCurso);

module.exports = router;

