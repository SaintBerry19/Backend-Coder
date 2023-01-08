import { Router } from "express";
import { fork } from "child_process";
import { puerto } from "../../../bin/www.js";
import logger from '../../../logs/logger.js'

const random = Router();

random.get("/", (req, res, next) => {
  try {    
    let cantidad = (req.query.cantidad);
    const child = fork("./routers/api/helpers/calculo.js");
    child.on("message", (msg) => {
      if (msg === "ready") {
        return child.send(cantidad)
      }
      if (msg === 'Adios!') return
      let data={counts: msg,process:puerto}
      logger.info(data)
      res.render("random",data)
    });
  } catch (error) {
    logger.error(error)
    next(error);
  }
});

export default random;
