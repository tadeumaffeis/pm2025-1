const express = require('express');
const bodyParser = require('body-parser');

// Importar as rotas
const instituicaoRoutes = require('./routes/instituicao');

const app = express();
app.use(bodyParser.json());

// Usar as rotas
app.use('/instituicao', instituicaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

