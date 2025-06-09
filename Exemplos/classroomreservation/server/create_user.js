const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/pmdb');

(async () => {
  const hashedAt = await bcrypt.hash('1234', 10);
  const userAt = 'tadeu.maffeis@gmail.com';
  const expirationDate = new Date(Date.now() + 3600000);
  const tokenAt = jwt.sign({ username: userAt }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });

  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  await User.create({ 
    username: userAt, 
    password: hashedAt, 
    token: tokenAt,
    tokenExpiration: expirationDate  });
  console.log('Usuário criado');
  process.exit();
})();   