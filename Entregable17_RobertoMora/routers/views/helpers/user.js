import { Router } from "express";
import logger from "../../../logs/logger.js";
import { editUser } from "../../../controllers/views/helpers.js";

const user = Router();

user.get("/user", (req, res, next) => {
  editUser(req.session.username,req.session).then((username) => {
    console.log(username)
    logger.info(username);
    res.render("user", username);
  });
});

export default user;