const fs = require("fs");

class Contenedor {
  constructor(path) {
    this.path = path;
  }

  saveObject(objects) {
    let file, data, contador;
    try {
      file = fs.readFileSync(this.path);
      try {
        data = JSON.parse(file);
        contador = data.length;
        objects.map((object) => {
          contador++;
          object.id = contador;
          data.push(object);
        });
        estructuracion(this.path, data);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      estructuracion(this.path, objects);
    }
  }

  getById(number) {
    let file, data, contador;
    try {
      file = fs.readFileSync(this.path);
      try {
        data = JSON.parse(file);
        if (data.length == 0) {
          return console.log('No hay datos.')
        }
        for (let index = 0; index < data.length; index++) {
          if (data[index].id == number)
            return console.log(
              `El producto que buscas es el siguiente: \n`,
              data[index]
            );
        }
        return console.log('El id brindado no existe, favor de seleccionar otro.')
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log('El archivo no existe.');
    }
  }

  getAll() {
    let file, data;
    try {
      file = fs.readFileSync(this.path);
      try {
        data = JSON.parse(file);
        return console.log(
          `Los productos que se tienen son los siguientes: \n`,
          data
        );
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      file = fs.writeFileSync(this.path, "[]");
      console.log("El archivo no existia, se creo un arreglo vacio");
    }
  }

  deleteById(number) {
    let file, data, contador;
    try {
      file = fs.readFileSync(this.path);
      try {
        data = JSON.parse(file);
        contador = data.length;
        for (let index = 0; index < data.length; index++) {
          if (data[index].id == number) {
            console.log(
              `El producto que eliminaras es el siguiente: \n`,
              data[index]
            );
            data = data.filter((item) => item.id != number);
            return  estructuracion(this.path, data);
          }
        }
        return  console.log('El id brindado no existe, favor de seleccionar otro.')
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log("El archivo no existe");
    }
  }
  deleteAll() {
    let file;
    try {
      file = fs.readFileSync(this.path);
      try {
        file = fs.writeFileSync(this.path, "[]");
        console.log("Los productos se borraron, se creo un arreglo vacio");
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log("El archivo no existe");
    }
  }
}
const data = [
  {
    title: "Producto 1",
    price: 256,
    thumbnail:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ",
  },
  {
    title: "Producto 2",
    price: 296,
    thumbnail:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ",
  },
];

function estructuracion(path, data) {
  fs.writeFileSync(path, "[\n\t");
  data.map((object, id) => {
    object.id = id + 1;
    fs.appendFileSync(path, `\t{\n\t\t"title": "${object.title}",\n\t`);
    fs.appendFileSync(path, `\t"price": ${object.price},\n\t`);
    fs.appendFileSync(path, `\t"thumbnail": "${object.thumbnail}",\n\t`);
    fs.appendFileSync(path, `\t"id": ${object.id}\n\t`);
    if (id + 1 !== data.length) {
      fs.appendFileSync(path, `},\n`);
    } else {
      fs.appendFileSync(path, `}\n`);
    }
  });
  fs.appendFileSync(path, "]");
}
const path1 = new Contenedor("./productos.txt");
path1.saveObject(data);
path1.getById(1);
path1.getAll();
path1.deleteAll();
path1.saveObject(data);
path1.saveObject(data);
path1.deleteById(3)
