const { Sequelize, DataTypes } = require('sequelize');

const postgresDb = new Sequelize('pmdb', 'postgres', 'A12345678a', {
  host: 'postgresql',
  dialect: 'postgres'
});

const ViewCurso = postgresDb.define('ViewCurso', {
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
},
  {
    tableName: 'viewcurso',
    timestamps: false,
    freezeTableName: true
  });

postgresDb.sync();
module.exports = ViewCurso;


