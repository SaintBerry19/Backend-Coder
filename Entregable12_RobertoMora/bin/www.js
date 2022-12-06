#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from '../index.js'
import Socket from '../Socket.js';
import DBG from 'debug';
import http from 'http';
import minimist from 'minimist'

const opts = {
  default: {
    puerto: 8080,
  },
  alias: {
    p: 'puerto',
  }
}
const params = minimist(process.argv.slice(2), opts)
if (params.puerto==true){params.puerto=8080}
console.log('Conectado al puerto:', params.puerto)


const debug = DBG('EntregaProyecto2_RobertoMora:server'); 

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(params.puerto);
export const base_host= `http://localhost:${port}`
console.log('Base host:', base_host)
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
Socket.init(server)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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