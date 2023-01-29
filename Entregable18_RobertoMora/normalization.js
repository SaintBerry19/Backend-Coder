import { schema, normalize, denormalize } from "normalizr";
import util from "util";

export default function normalizer(mensajes) {
  const data = { id: "mensajes", mensajes: mensajes };

  function print(object) {
      console.log(util.inspect(object, false, 14, true));
    }

  const authorsSchema = new schema.Entity("authors");

  const mensajesSchema = new schema.Entity(
    "mensajes",
    {
      author: authorsSchema,
    },
    { idAttribute: "_id" }
  );

  const holdingSchema = new schema.Entity("grupos", {
    mensajes: [mensajesSchema],
  });

  const dataNormalized = normalize(data, holdingSchema);
  const dataDenormalized = denormalize(
    dataNormalized.result,
    holdingSchema,
    dataNormalized.entities
  );

  const origsize = JSON.stringify(data).length;
  const normsize = JSON.stringify(dataNormalized).length;
  const denormsize = JSON.stringify(dataDenormalized).length;

  // console.log(origsize)
  // print(data)
  // console.log("/////////////////////////////////////")
  // console.log(normsize)
  // print(dataNormalized)
  // console.log("/////////////////////////////////////")
  // console.log(denormsize)
  // print(dataDenormalized)
  


  const result = ((normsize * 100) / origsize).toFixed(2);
  return result
}