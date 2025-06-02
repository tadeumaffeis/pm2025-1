const instituicao = require('../models/Instituicao');

// Criar
const inserirInstituicao = async (req, res) => {
  try {
    const result = await instituicao.create(req.body);
    res.json({ message: 'Instituição inserida com sucesso', result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar
const listarInstituicao = async (req, res) => {
  try {
    const result = await instituicao.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar
const atualizarInstituicao = async (req, res) => {
  try {
    const { id } = req.params;
    const [linhasAfetadas] = await instituicao.update(req.body, {
      where: { id }
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    res.json({ message: 'Instituição atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar
const removerInstituicao = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await instituicao.destroy({
      where: { id }
    });

    if (deletado === 0) {
      return res.status(404).json({ message: 'Instituição não encontrada' });
    }

    res.json({ message: 'Instituição deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  inserirInstituicao,
  listarInstituicao,
  removerInstituicao,
  atualizarInstituicao
};
