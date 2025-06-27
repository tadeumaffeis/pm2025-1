const express = require('express');
const bodyParser = require('body-parser');
const viewCursoRoute = require('./routes/ViewCursoRoute.js')
const authRoute = require('./routes/authRoute.js')
const instituicaoRoute = require('./routes/instituicaoRoute.js')
const cors = require('cors');

const app = express();

app.use(cors()); // Libera todas as origens

// ou configure apenas para o frontend específico:
//app.use(cors({
//  origin: 'http://localhost:5173'
//}));

// Importar as rotas
//const instituicaoRoutes = require('./routes/instituicao');

app.use(bodyParser.json());

// Usar as rotas
//app.use('/instituicao', instituicaoRoutes);

app.use('/api/curso', viewCursoRoute);
app.use('/api/instituicao', instituicaoRoute);
app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

