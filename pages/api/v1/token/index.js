const { EventEmitter } = require("events");
import { v4 as uuidv4 } from "uuid";
import ConnectDB from "../../../../API/ddbb/conect";
import ModelToken from "../../../../API/Token/models/token";
const Eventos = new EventEmitter();
const Actions = {
  GET: (uid, data) => {
    ModelToken.find({})
      .then((datos) => {
        Eventos.emit(uid, { status: 200, data: datos });
        return datos;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
export default async (req, res) => {
  ConnectDB()
    .then(() => {
      const uid = uuidv4();
      const { method, body } = req;
      const Fresponse = (response) => {
        res.status(response.status).json(response);
        Eventos.removeListener(uid, Fresponse);
      };

      Eventos.on(uid, Fresponse);
      try {
        Actions[method](uid, { status: 200, data: body });
      } catch (error) {
        console.log(error);
        Eventos.emit(uid, { status: 500, data: "Error en el servidor" });
      }
    })
    .catch(() => {
      res.status(500).json({ status: 500, data: "Error en el servidor" });
    });
};
