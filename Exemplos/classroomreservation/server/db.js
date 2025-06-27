// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/pmdb');
    console.log('MongoDB conectado com sucesso');
  } catch (err) {
    console.error('Erro na conexão MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
