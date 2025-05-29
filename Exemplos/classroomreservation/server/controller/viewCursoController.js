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

module.exports = {
    inserirCurso,
    listarCursos
};
