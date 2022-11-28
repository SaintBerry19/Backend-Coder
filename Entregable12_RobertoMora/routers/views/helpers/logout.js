import { Router } from "express";
import auth from "../../../middlewares/authorization.js";
import { base_host } from "../../../bin/www.js";


const logout = Router();

logout.post("/logout", auth, (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (!error) {
        const data = { base_url:base_host}
        res.render("login",data);
      } else {
        res.send("Ah ocurrido un error", error.message);
      }
    });
  } catch (error) {
    next(error);
  }
});
export default logout;
