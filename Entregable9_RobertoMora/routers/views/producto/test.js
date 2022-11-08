import { Router } from "express";
import { faker } from "@faker-js/faker/locale/es";

const test = Router();

test.get("/test/", (req, res, next) => {
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
    const data = {value:getProducts()};
    res.render("test", data);
  } catch (error) {
    next(error);
  }
});

export default test;