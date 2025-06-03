const express = require('express');
const bodyParser = require('body-parser');
const viewCursoRoute = require('./routes/ViewCursoRoute.js')
const instituicaoRoute = require('./routes/instituicaoRoute.js')
//const cors = require('cors');

const https = require('https');
const fs = require('fs');

const app = express();

// Lê os arquivos de certificado e chave
const options = {
  key: fs.readFileSync('./sslkey/server.key'),
  cert: fs.readFileSync('./sslkey/server.cert')
};


// ou configure apenas para o frontend específico:
//app.use(cors({
//  origin: 'http://localhost:5173'
//}));

// Importar as rotas
//const instituicaoRoutes = require('./routes/instituicao');

app.use(bodyParser.json());

// Usar as rotas
//app.use('/instituicao', instituicaoRoutes);

app.use('/curso', viewCursoRoute);
app.use('/instituicao', instituicaoRoute);

const PORT = process.env.PORT || 443;
https.createServer(options, app).listen(PORT, () => {
    console.log('Server rodando em https://localhost:' + PORT);
  });

