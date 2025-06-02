const express = require('express');
const router = express.Router();

// Importar modelos
const InstituicaoMySQL = require('../models/instituicao_mysql');
const InstituicaoPostgres = require('../models/instituicao_postgres');
const InstituicaoMongo = require('../models/instituicao_mongo');

// Função genérica para escolher o banco (só para exemplo, melhor seria via parâmetro ou configuração)
const getModel = (db) => {
  if (db === 'mysql') return InstituicaoMySQL;
  if (db === 'postgres') return InstituicaoPostgres;
  if (db === 'mongo') return InstituicaoMongo;
};

// Criar
router.post('/:db', async (req, res) => {
  const { db } = req.params;
  const model = getModel(db);
  try {
    const instituicao = await model.create(req.body);
    res.json(instituicao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar
router.get('/:db', async (req, res) => {
  const { db } = req.params;
  const model = getModel(db);
  try {
    const instituicoes = await model.findAll ? await model.findAll() : await model.find();
    res.json(instituicoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar
router.put('/:db/:id', async (req, res) => {
  const { db, id } = req.params;
  const model = getModel(db);
  try {
    let result;
    if (model.update) {
      result = await model.update(req.body, { where: { id } });
    } else {
      result = await model.findByIdAndUpdate(id, req.body, { new: true });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar
router.delete('/:db/:id', async (req, res) => {
  const { db, id } = req.params;
  const model = getModel(db);
  try {
    let result;
    if (model.destroy) {
      result = await model.destroy({ where: { id } });
    } else {
      result = await model.findByIdAndDelete(id);
    }
    res.json({ message: 'Instituição deletada com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
