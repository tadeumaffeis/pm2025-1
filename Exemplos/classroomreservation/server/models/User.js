require('dotenv').config(); // deve ser a primeira linha do arquivo
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  tokenExpiration: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
