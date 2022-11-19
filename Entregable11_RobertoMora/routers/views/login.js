import { Router } from "express";
import { usuariosDao } from "../../daos/index.js";


const login = Router();

login.get("/login", (req, res, next) => {
  res.render("login");
});

login.post("/login", (req, res, next) => {
  try {
    usuariosDao.buscar(req.body.username).then((value) => {
      if (value.length===0){
        const data = { mensaje: "Usuario Invalido!" };
        res.render("loginerror",data);
      }
      else{
        if (value[0].password===req.body.password){
          let username = req.body.username
          req.session.username = username;
          req.session.contador += 1
          req.session.isAuth = true
          let data = {username:{username: req.session.username, contador: req.session.contador}}
          res.render("menu", data);
        }else{
          const data = { mensaje: "Constrasena Incorrecta!" };
          res.render("loginerror",data)
        }
      }
    })
  } catch (error) {
    next(error);
  }
});

export default login;
