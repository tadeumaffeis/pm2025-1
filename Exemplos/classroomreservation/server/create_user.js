const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const connectDB = require('./db'); // 👈 conexão centralizada
require('dotenv').config();

(async () => {
  //await connectDB(); // ✅ conecta ao Mongo

  const hashedAt = await bcrypt.hash('1234', 10);
  const userAt = 'tadeu.maffeis@gmail.com';
  const expirationDate = new Date(Date.now() + 3600000);
  const tokenAt = jwt.sign({ username: userAt }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });

  await User.create({
    username: userAt,
    password: hashedAt,
    token: tokenAt,
    tokenExpiration: expirationDate
  });

  console.log('Usuário criado');
  process.exit();
})();
