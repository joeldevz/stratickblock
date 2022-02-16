const { EventEmitter } = require("events");
import { v4 as uuidv4 } from "uuid";
import ConnectDB from "../../../../API/ddbb/conect";
import ModelToken from "../../../../API/Token/models/token";
export default async function handler(req, res) {
  const {
    query: { token },
    method,
  } = req;

  await ConnectDB();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
          console.log(token)
        const result = await ModelToken.find({ symbol: token.toUpperCase() });
        if (!result) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
