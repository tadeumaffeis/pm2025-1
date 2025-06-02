const { Sequelize, DataTypes } = require('sequelize');

const postgresDb = new Sequelize('pmdb', 'postgres', 'A12345678a', {
  host: 'localhost',
  dialect: 'postgres'
});

const Instituicao = postgresDb.define('instituicao', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
    tableName: 'instituicao',
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = Instituicao;
