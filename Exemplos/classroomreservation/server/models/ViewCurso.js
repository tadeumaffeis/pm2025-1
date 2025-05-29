const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('pmdb', 'postgres', 'A12345678a', {
  host: 'localhost',
  dialect: 'postgres'
});

const ViewCurso = sequelize.define('ViewCurso', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_instituicao: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome_instituicao: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'viewcurso',
    timestamps: false,
    freezeTableName: true
  });

module.exports = ViewCurso;


