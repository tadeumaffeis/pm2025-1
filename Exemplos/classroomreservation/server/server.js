const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors()); // Libera todas as origens

// ou configure apenas para o frontend específico:
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Importar as rotas
const instituicaoRoutes = require('./routes/instituicao');

app.use(bodyParser.json());

// Usar as rotas
app.use('/instituicao', instituicaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

