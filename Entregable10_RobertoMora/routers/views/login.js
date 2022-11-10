import { Router } from "express";

const login = Router();

login.get("/login", (req, res, next) => {
  res.render("login");
});

login.post("/login", (req, res, next) => {
  try {
    let users = ["roberto", "julio"];
    let user = req.body.nombre;
    let validation = users.includes(user);
    if (validation) {
      req.session.username = user;
      req.session.contador += 1
      req.session.isAuth = true
      let data = {username:{username: req.session.username, contador: req.session.contador}}
      res.render("menu", data);
    } else {
      const data = { mensaje: "Usuario Invalido!" };
      res.render("login",data);
    }
  } catch (error) {
    next(error);
  }
});

export default login;
