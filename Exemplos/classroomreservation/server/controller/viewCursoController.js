const ViewCurso = require('../models/ViewCurso');

const inserirCurso = async (req, res) => {
  try {
    const { id, nome, id_instituicao } = req.body;
    const novoCurso = await ViewCurso.create({
      id,
      nome,
      id_instituicao
    });
    console.log('Curso inserido com sucesso:',  novoCurso.toJSON());
    res.status(200).json({'message':'Curso inserido com sucesso'});
  } catch (err) {
    console.error('Erro ao inserir curso:', err);
    res.status(505).json({'message':'Curso não inserido'});
  }
}

const listarCursos = async (req, res) => {
  try {
     const cursos = await ViewCurso.findAll();
     console.table(cursos.map(c => c.toJSON()));
     res.status(200).json(cursos);
  } catch (err) {
    console.error('Erro ao listar cursos:', err);
    res.status(505).json({'message':'Erro ao listar cursos'});
  } 
}

// Atualizar
const atualizarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    console.assert(req.body, 'Dados para atualização não fornecidos');
    const [linhasAfetadas] = await ViewCurso.update(req.body, {
      where: { id }
    });

    if (linhasAfetadas === 0) {
      return res.status(404).json({ message: 'Instituição não encontrada'});
    }

    res.json({ message: 'Instituição atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar
const removerCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await ViewCurso.destroy({
      where: { id }
    });

    if (deletado === 0) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }

    res.json({ message: 'Curso deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    inserirCurso,
    listarCursos,
    atualizarCurso,
    removerCurso
};
