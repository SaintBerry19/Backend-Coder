import { Router } from "express";
import { faker } from "@faker-js/faker/locale/es";
import auth from "../../../middlewares/authorization.js"
import { base_host } from "../../../bin/www.js";

const test = Router();

test.get("/test/", auth, (req, res, next) => {
  try {
    function getProducts() {
      const productos = [];
      for (let index = 0; index < 5; index++) {
        productos.push({
          id: index + 1,
          nombre: faker.word.noun(),
          precio: faker.datatype.number({
            min: 100,
            max: 1000,
            precision: 0.01,
          }),
          avatar: faker.image.image(),
        });
      }
      return productos;
    }
    const data = {value:getProducts(),username: req.session,base_url:base_host};
    res.render("test", data);
  } catch (error) {
    next(error);
  }
});

export default test;