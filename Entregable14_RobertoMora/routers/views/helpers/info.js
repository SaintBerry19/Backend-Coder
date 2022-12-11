import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import { base_host } from "../../../bin/www.js";
import os from "os";
import compression from "compression";
import logger from "../../../logs/logger.js";

const info = Router();

info.get("/info", auth, (req, res, next) => {
  try {
    let data = {
      num: os.cpus().length,
      directorio: process.cwd(),
      idProcess: process.pid,
      version: process.version,
      title: process.title,
      plataform: process.platform,
      execution: process.execPath,
      memory: process.memoryUsage(),
      base_url: base_host,
    };
    logger.info(data)
    res.render("info", data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

info.get("/infozip", auth, compression(), (req, res, next) => {
  try {
    let data = {
      num: os.cpus().length,
      directorio: process.cwd(),
      idProcess: process.pid,
      version: process.version,
      title: process.title,
      plataform: process.platform,
      execution: process.execPath,
      memory: process.memoryUsage(),
      base_url: base_host,
    };
    logger.info(data)
    res.render("info", data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default info;
