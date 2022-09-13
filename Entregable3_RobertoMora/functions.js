import * as fs from 'fs'

export class Contenedor {
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
      let file, data, object;
      try {
        file = fs.readFileSync(this.path);
        try {
          data = JSON.parse(file);
          if (data.length == 0) {
            return console.log("No hay datos.");
          }
          for (let index = 0; index < data.length; index++) {
            if (data[index].id == number) {
              object = data[index];
              return object;
            }
          }
          return console.log(
            "El id brindado no existe, favor de seleccionar otro."
          );
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log("El archivo no existe.");
      }
    }
  
    getAll() {
      let file, data;
      try {
        file = fs.readFileSync(this.path);
        try {
          data = JSON.parse(file);
          return data;
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
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
              return estructuracion(this.path, data);
            }
          }
          return console.log(
            "El id brindado no existe, favor de seleccionar otro."
          );
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

  
function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min) + min);
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
      price: 219,
      thumbnail:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ",
    },
    {
      title: "Producto 3",
      price: 230,
      thumbnail:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ",
    },
    {
      title: "Producto 4",
      price: 256,
      thumbnail:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ",
    },
    {
      title: "Producto 5",
      price: 219,
      thumbnail:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ",
    },
    {
      title: "Producto 6",
      price: 230,
      thumbnail:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fdefinicion.de%2Fwp-content%2Fuploads%2F2009%2F06%2Fproducto.png&imgrefurl=https%3A%2F%2Fdefinicion.de%2Fproducto%2F&tbnid=8bnIkwWbu7uGCM&vet=12ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ..i&docid=kyhCT_35T45iEM&w=640&h=457&q=producto&ved=2ahUKEwju5OHdk_n5AhUGnWoFHUukAnsQMygBegUIARC-AQ",
    },
  ];
  
const path1 = new Contenedor("./productos.txt");
const file = fs.readFileSync("./productos.txt");
const data2 = JSON.parse(file);
const randomnumber = getRandomArbitrary(1, data2.length + 1);
export const lista = path1.getAll();
export const randomproduct = path1.getById(randomnumber);