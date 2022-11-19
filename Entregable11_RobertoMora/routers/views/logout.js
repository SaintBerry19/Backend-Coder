import { Router } from "express";
import auth from "../../middlewares/authorization.js";

const logout = Router();

logout.post("/logout", auth, (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (!error) {
        res.render("login");
      } else {
        res.send("Ah ocurrido un error", error.message);
      }
    });
  } catch (error) {
    next(error);
  }
});
export default logout;
