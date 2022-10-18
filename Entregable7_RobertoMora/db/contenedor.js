import knex from "knex";

// const options = {
//   client: "mysql2",
//   connection: {
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "MyNewPass",
//     database: "ecommerce",
//   },
// };

const options = {
  client: 'sqlite3',
  connection: {
    filename: './ecommerce.sqlite'
  },
}

export default class Contenedor {
  constructor(table) {
    this.table = table;
  }

  async createTable() {
    const knexInstance = knex(options);
    if (this.table === "messages") {
      try {
        const exist = await knexInstance.schema.hasTable(this.table);
        if (exist) {
          console.log(`La tabla ${this.table} ya existe.`);
          return;
        }
        await knexInstance.schema.createTable(this.table, (table) => {
          table.increments("id").notNullable();
          table.string("Email", 35).notNullable();
          table.string("Date").notNullable();
          table.text("Message").notNullable();
          table.primary("id");
        });
        console.log(`Tabla ${this.table} creada.`);
      } catch (error) {
        console.error(error.message);
        throw error;
      } finally {
        knexInstance.destroy();
      }
    } else {
      try {
        const exist = await knexInstance.schema.hasTable(this.table);
        if (exist) {
          console.log(`La tabla ${this.table} ya existe.`);
          return;
        }
        await knexInstance.schema.createTable(this.table, (table) => {
          table.increments("id").notNullable();
          table.string("_id", 45).notNullable();
          table.string("nombre").notNullable();
          table.string("precio").notNullable();
          table.text("avatar").notNullable();
          table.string("stock").notNullable();
          table.string("codigo").notNullable();
          table.string("descripcion").notNullable();
          table.primary("id");
        });
        console.log(`Tabla ${this.table} creada.`);
      } catch (error) {
        console.error(error.message);
        throw error;
      } finally {
        knexInstance.destroy();
      }
    }
  }
  async insert(data) {
    const knexInstance = knex(options);
    if (this.path === 'messasges') {
      try {
        await knexInstance(`${this.table}`).insert(data);
        console.log("Mensajes agregados con exito");
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        knexInstance.destroy();
      }
    } else {
      try {
        await knexInstance(`${this.table}`).insert(data);
        console.log("Productos agregados con exito");
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        knexInstance.destroy();
      }
    }
  }
}
