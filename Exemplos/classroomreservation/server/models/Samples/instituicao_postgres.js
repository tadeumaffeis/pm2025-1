const { Sequelize, DataTypes } = require('sequelize');

const postgresDb = new Sequelize('pmdb', 'postgres', 'A12345678a', {
  host: 'localhost',
  dialect: 'postgres'
});

const InstituicaoPostgres = postgresDb.define('instituicao', {
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

postgresDb.sync();
module.exports = InstituicaoPostgres;
