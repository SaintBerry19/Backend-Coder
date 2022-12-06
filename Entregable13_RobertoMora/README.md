Archivo nginx.conf:
events {
}

http {
  include       mime.types;
  default_type  application/octet-stream;

  upstream node_app {
    server 127.0.0.1:8082;
    server 127.0.0.1:8083;
    server 127.0.0.1:8084;
    server 127.0.0.1:8085;

  }

  server {
    listen      80;
    server_name nginx_node;
    root '/Users/robertomora/Documents/Coding/Backend Course/Backend Codes/Entregables/Backend-Coder/Entregable13_RobertoMora/public';

    location /api/random {
      proxy_pass http://node_app;
    }

  }
}
//////////////////////////////
Modo FORK nodemon : npm run dev -- -p <puerto> -m FORK
Modo CLUSTER nodemon : npm run dev -- -p <puerto> -m CLUSTER
Modo Forever: forever start -c "npm run dev -- -p <puerto> -m <mode>" ./
Modo PM2: pm2 start npm --name "<nombre>" -- run dev -- -p <puerto> -m <mode>

De manera predefinida el archigo manda las consultas de api/random a otro proceso distinto al principal.

Crear 4 instancias para nginx:
    pm2 start npm --name "<nombre>" -- run dev -- -p <puerto> -m <mode> cambiar puertos y usar modo fork.
    cambiar archivo nginx por el descrito al inicio.
    Para utilizar siguiente url: localhost:/api/random?cantidad=<numerodeseado>