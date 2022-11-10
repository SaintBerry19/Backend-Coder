import { ObjectId } from "mongodb";
import pick from "lodash/pick.js";
import remove from "lodash/remove.js";

class ContenedorMemoria {
  constructor() {
    this.elementos = [];
  }

  async listar(id) {
    const elem = this.elementos.find((elem) => elem.id == id);
    if (!elem) {
      throw new Error(`Error al listar: elemento no encontrado`);
    } else {
      return elem;
    }
  }

  async listarAll() {
    return [...this.elementos];
  }

  guardar(data) {
    const id = new ObjectId();
    data.estado = "activo";
    data.create_time = new Date();
    data.update_time = new Date();
    const newelem = { id, ...data };
    this.elementos.push(newelem);
    return newelem;
  }

 async actualizar(id, elem, dataRequest) {
    if (elem === "productos") {
      const elem = await this.listar(id);
      const fieldTarget = [
        "nombre",
        "precio",
        "descipcion",
        "codigo",
        "stock",
        "avatar",
        "estado",
        "contador",
      ];
      const data = {
        ...pick(dataRequest, fieldTarget),
        update_time: new Date(),
      };
      const newelem = Object.assign(elem, data);
      return newelem;
    } else {
      const elem = await this.listar(id);
      const fieldTarget = [
        "productos",
      ];
      const data = {
        ...pick(dataRequest, fieldTarget),
        update_time: new Date(),
      };
      const newelem = Object.assign(elem, data);
      return newelem;
    }
  }

  async borrar(id) {
    const elems = await this.listar(id);
    remove(this.elementos, (elems) => String(elems.id) === String(id));
    return elems;
  }

  borrarAll() {
    this.elementos = [];
  }
}

export default ContenedorMemoria;
