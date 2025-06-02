const { Sequelize, DataTypes } = require('sequelize');

const mysqlDb = new Sequelize('pmdb', 'root', 'A12345678a', {
  host: 'localhost',
  dialect: 'mysql'
});

const InstituicaoMySQL = mysqlDb.define('instituicao', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cidade: {
    type: DataTypes.STRING
  },
  estado: {
    type: DataTypes.STRING(2)
  }
});

mysqlDb.sync();
module.exports = InstituicaoMySQL;
