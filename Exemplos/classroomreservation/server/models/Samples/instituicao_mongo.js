const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pmdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const InstituicaoMongo = mongoose.model('instituicao', new mongoose.Schema({
  nome: { type: String, required: true },
  cidade: String,
  estado: String
}));

module.exports = InstituicaoMongo;
