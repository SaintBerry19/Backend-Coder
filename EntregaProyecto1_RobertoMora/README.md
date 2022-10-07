# API Perfiles de usuario (Resumen de la clase 8)
Este es un servicio backend que permite el **manejo de usuarios**. Este servicio permite la `crear`, `obtener`, `actualizar` y `eliminar` **usuarios**. Ideal para un **ecommerce**.

## Configuración
Primero debemos crear un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido:
```
NODE_PORT=3000
NODE_ENV=local
MONGODB_URI=mongodb://localhost:27017
```
Acá estamos configurando una variable de entorno para nuestro proyecto las cuales se especifican a continuación:
| VARIABLE | VALOR DEFAULT | DESCRIPCIÓN |
| ------ | ------ | ------ |
| `NODE_PORT` | `3000` | Puerto por donde escuchará nuestro servicio. |
| `NODE_ENV` | `local` | Entorno en el cual se ejecuta. Posibles valores: `local`, `test`, `qa`, `prod`. |
| `MONGODB_URI` | `mongodb://localhost:27017` | Cadena de conexión a mongodb. |

> Nota: En el archivo `.env-example` se encuentra un ejemplo funcional de esto. Solo debe tener en cuenta que tiene mongodb corriendo en su local o cambiar la variable `MONGODB_URI` con la cadena de conexión de su instancia de mongodb.

## Ejecutar en producción
```sh
npm start
```

## Ejecutar en desarrollo
```sh
npm run dev
```

## Postman Collection

En la raíz del proyecto encontrarán el archivo `User Profile.postman_collection.json` que les permitirá probar desde postman los endpoint del servicio.