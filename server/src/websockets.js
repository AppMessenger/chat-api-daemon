var WebSocketServer = require('ws').Server;

var websockets = {}

websockets.init = function(port, EventEmitter) {
  websockets.EventEmitter = EventEmitter;
  websockets.wss = new WebSocketServer({ port: port });

  websockets.wss.on('connection', websockets.handleConnection);
  websockets.EventEmitter.on('whatsapp_event', websockets.handleWhatsappEvent);
}

websockets.handleConnection = function(ws) {
  ws.on('message', function(message) {
    message = JSON.parse(message);
    websockets.EventEmitter.emit('send_command', message.method, message.args);
  })
}

websockets.handleWhatsappEvent = function(method, args) {
  websockets.wss.clients.forEach(function(client) {
    client.send(JSON.stringify({method: method, args: args}));
  });
}

module.exports = websockets;
