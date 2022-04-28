const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Operaciones",
    {
      concepto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM("ingreso", "egreso"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
