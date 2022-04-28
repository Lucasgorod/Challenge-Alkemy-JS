const { Sequelize, Op } = require("sequelize");
const modelOperaciones = require("./Models/Operaciones.js");

const sequelize = new Sequelize(
  "postgres://postgres:Postgresql@localhost:5432/presupuesto",
  {
    logging: false,
  }
);

modelOperaciones(sequelize);

const { Operaciones } = sequelize.models;

module.exports = {
  Operaciones,
  db: sequelize,
  Op,
};
