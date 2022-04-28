const express = require("express");
const { db, Operaciones } = require("./db.js");

const server = express();
server.use(express.json());

//Ingresa una nueva operación
server.post("/operaciones", async (req, res) => {
  const { concepto, monto, fecha, tipo } = req.body;
  try {
    const nuevaOperacion = await Operaciones.create({
      concepto,
      monto,
      fecha,
      tipo,
    });
    res.json(Operaciones);
  } catch (error) {
    res.send(error);
  }
});
//Obtiene las operaciones de acuerdo a su tipo: INGRESO o EGRESO, sino devuelve todas las operaciones.
server.get("/operaciones/:tipo", async (req, res) => {
  try {
    const { tipo } = req.params;
    if (tipo !== "ingreso" && tipo !== "egreso") {
      let todasLasOperaciones = await Operaciones.findAll({
        order: [["fecha", "DESC"]],
      });
      res.json(todasLasOperaciones);
    } else {
      let operacionesSegunTipo = await Operaciones.findAll({
        where: { tipo: tipo },
        order: [["fecha", "DESC"]],
      });
      res.json(operacionesSegunTipo);
    }
  } catch (error) {
    res.send(error);
  }
});
//Borra una operación cargada a través de su ID
server.delete("/operaciones/delete", async (req, res, next) => {
  const { id } = req.body;

  try {
    let operacionABorrar = await Operaciones.findByPk(id);
    if (!operacionABorrar) {
      res.status(400).send(`no hay operaciones con el id ${id}`);
    }
    await Operaciones.destroy({
      where: {
        id: operacionABorrar.id,
      },
    });
    res.status(200).send(`La operación fue eliminada.`);
  } catch (error) {
    res.send(error);
  }
});

//Modifica una operación ya realizada exceptuando su tipo
server.put("/operaciones/update", async (req, res, next) => {
  const { id, concepto, fecha, monto, tipo } = req.body;
  try {
    const operacionActualizada = await Operaciones.update(
      {
        concepto,
        fecha,
        monto,
      },
      { where: { id: id } }
    );
    res.status(200).send(`La operación fue modificada`);
  } catch (error) {
    res.send(error);
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
  db.sync({ force: false });
});
