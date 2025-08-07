require('dotenv').config(); // deve ser a primeira linha do arquivo
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const saltRounds = 10;

// login
const loginAuth = async (req, res) => {
    login(req, res);
};

// verify
const verifyAuth = async (req, res) => {
    verify(req, res);
};


// Rota de login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION
    });

    const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1h

    user.token = token;
    user.tokenExpiration = expiration;
    await user.save();

    return res.json({ token, expiresAt: expiration });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

// Verificação de validade de token
const verify =  async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ausente ou inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ username: decoded.username, token });

    if (!user || user.tokenExpiration < new Date()) {
      return res.status(403).json({ message: 'Token expirado ou inválido' });
    }

    return res.json({ valid: true, username: user.username });
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido', error: err.message });
  }
};

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ausente ou inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ username: decoded.username, token });

    if (!user || user.tokenExpiration < new Date()) {
      return res.status(403).json({ message: 'Token expirado ou inválido' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido', error: err.message });
  }
};

module.exports = { loginAuth, verifyAuth, checkAuth };  