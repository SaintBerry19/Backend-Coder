import { Router } from "express";
import { base_host } from "../../../bin/www.js";
import logger from "../../../logs/logger.js";
import { usuariosDao } from "../../../daos/index.js";

const user = Router()

user.get('/user', (req, res, next) => {
    usuariosDao.buscar(req.session.username).then((value) => {
        let userid = value[0]._id.toString();
        let avatar = value[0].avatar;
        const { username } = {
          username: {
            username: req.session,
            base_url: base_host,
            avatar:avatar,
            userid: userid,
          },
        };
        logger.info(username);
        res.render("user", username);
    });
})

export default user
