import { Router } from "express";
import { fork } from "child_process";

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
      let data={counts: msg}
      res.render("random",data)
    });
  } catch (error) {
    next(error);
  }
});

export default random;
