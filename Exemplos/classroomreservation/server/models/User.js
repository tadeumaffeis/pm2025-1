const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pmdb', {
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
