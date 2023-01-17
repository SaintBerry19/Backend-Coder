#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../index.js'
import Socket from '../Socket.js';
import DBG from 'debug';
import http from 'http';
import minimist from "minimist";
import cluster from 'cluster'
import os from 'os'

const debug = DBG('EntregaProyecto2_RobertoMora:server'); 

const opts = {
  default: {
    puerto: 8080,
    mode: "FORK",
    factory:'mongodb'
  },
  alias: {
    p: "puerto",
    m: "mode",
    f:'factory'
  },
};
const params = minimist(process.argv.slice(2), opts);
export const puerto = params.puerto;
const mode = params.mode;
export const base_host= `http://localhost:${puerto}`
const factory=params.factory
export const persistencia=factory


if (mode === "CLUSTER" && cluster.isPrimary) {
  // Require node in version 16 or higher. Other versions call isMaster property.
  console.log("Conectado al puerto:", puerto);
  console.log('Base host:', base_host)
  console.log('Usando el modo:', mode)
  let num = os.cpus().length
  console.log(`cpu length ${num}`)
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `worker ${worker.process.pid} | code ${code} | signal ${signal}`
    );
    console.log("Starting a new worker...");
    cluster.fork();
  });
} else {
  
var port = normalizePort(puerto);
console.log("Numero de proceso:", process.pid);
app.set('port', port);

var server = http.createServer(app);
Socket.init(server)

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
}
/**
 * Create HTTP server.
 */


/**
 * Listen on provided port, on all network interfaces.
 */


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
