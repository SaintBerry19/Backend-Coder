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

//////////////////////////////
localhost:PORT/info
Usando metodo sin compresion: 
info: 1.8kB
localhost:PORT/infozip
Usando metodo con compresion:
info: 1.1kB
/////////////////////////////
FORK 

Runnig all benchmarks in parallel...
Running 20s test @ http://localhost:8080/info
100 connections


┌─────────┬────────┬────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%   │ 99%     │ Avg       │ Stdev     │ Max     │
├─────────┼────────┼────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 176 ms │ 962 ms │ 1714 ms │ 1929 ms │ 920.64 ms │ 299.04 ms │ 2264 ms │
└─────────┴────────┴────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬─────────┬─────────┬────────┬────────┬────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼─────────┼─────────┤
│ Req/Sec   │ 26      │ 26      │ 109    │ 118    │ 104.85 │ 19.5    │ 26      │
├───────────┼─────────┼─────────┼────────┼────────┼────────┼─────────┼─────────┤
│ Bytes/Sec │ 32.3 kB │ 32.3 kB │ 135 kB │ 147 kB │ 130 kB │ 24.2 kB │ 32.3 kB │
└───────────┴─────────┴─────────┴────────┴────────┴────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.
# of samples: 20

2k requests in 20.04s, 2.6 MB read