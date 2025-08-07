const { Sequelize, DataTypes } = require('sequelize');

const postgresDb = new Sequelize('pmdb', 'postgres', 'A12345678a', {
  host: 'postgresql',
  dialect: 'postgres'
});
const Instituicao = postgresDb.define('instituicao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
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

postgresDb.sync();
module.exports = Instituicao;
