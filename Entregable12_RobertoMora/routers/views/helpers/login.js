import { Router } from "express";
import { usuariosDao } from "../../../daos/index.js";
import { isValidPassword} from '../../../utils.js'
import { base_host } from "../../../bin/www.js";


const login = Router();

login.get("/login", (req, res, next) => {
  if (req.session.username){
    let data = {username:{username: req.session.username, contador: req.session.contador,base_url:base_host}}
    res.render("menu", data);
  }else{res.render("login");}
});

login.post("/login", (req, res, next) => {
  try {
    usuariosDao.buscar(req.body.username).then((value) => {
      if (value.length===0){
        const data = { mensaje: "Usuario o Constrasena Invalidos!", base_url:base_host };
        res.render("loginerror",data);
      }
      else{
        if (isValidPassword(req.body.password,value[0].password)){
          let username = req.body.username
          req.session.username = username;
          req.session.contador += 1
          req.session.isAuth = true
          let data = {username:{username: req.session.username, contador: req.session.contador, base_url:base_host}}
          res.render("menu", data);
        }else{
          const data = { mensaje: "Usuario o Constrasena Invalidos!", base_url:base_host};
          res.render("loginerror",data)
        }
      }
    })
  } catch (error) {
    next(error);
  }
});

export default login;
