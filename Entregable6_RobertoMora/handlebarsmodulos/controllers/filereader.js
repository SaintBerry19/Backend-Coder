import * as fs from 'fs';

path='../../historial/historial.txt'

function saveMessage(objects) {
  let file, data, contador;
  try {
    file = fs.readFileSync(path);
    try {
      data = JSON.parse(file);
      contador = data.length;
      objects.map((object) => {
        contador++;
        object.id = contador;
        data.push(object);
      });
      historial(path, data);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    historial(path, objects);
  }
}

function historial(path, data) {
  fs.writeFileSync(path, "[\n\t");
  data.map((object, id) => {
    object.id = id + 1;
    fs.appendFileSync(path, `\t{\n\t\t"email": "${object.email}",\n\t`);
    fs.appendFileSync(path, `\t"date": ${object.date},\n\t`);
    fs.appendFileSync(path, `\t"message": "${object.message}",\n\t`);
    fs.appendFileSync(path, `\t"id": ${object.id}\n\t`);
    if (id + 1 !== data.length) {
      fs.appendFileSync(path, `},\n`);
    } else {
      fs.appendFileSync(path, `}\n`);
    }
  });
  fs.appendFileSync(path, "]");
}

module.exports = {
    saveMessage
  }