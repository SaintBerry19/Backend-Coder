import { Router } from "express";
import auth from "../../../middlewares/authorization.js"
import { base_host } from "../../../bin/www.js";


const info = Router()

info.get("/info", auth, (req, res, next) => {
  let data ={
    directorio: process.cwd(),
    idProcess: process.pid,
    version: process.version,
    title: process.title,
    plataform: process.platform,
    execution: process.execPath,
    memory:process.memoryUsage(),
    base_url: base_host 

  }
res.render("info",data);
  });

export default info;