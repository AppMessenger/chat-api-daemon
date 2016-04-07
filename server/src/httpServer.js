var request = require('request');

var httpServer = {}

httpServer.init = function(port, callbackUrls, EventEmitter) {
  httpServer.EventEmitter = EventEmitter;
  httpServer.callbackUrls = callbackUrls;
  //httpServer.wss = new WebSocketServer({ port: port });

  //websockets.wss.on('connection', websockets.handleConnection);
  httpServer.EventEmitter.on('whatsapp_event', httpServer.handleWhatsappEvent);
}

httpServer.handleConnection = function(ws) {
  ws.on('message', function(message) {
    message = JSON.parse(message);
    websockets.EventEmitter.emit('send_command', message.method, message.args);
  })
}

httpServer.handleWhatsappEvent = function(method, args) {
  httpServer.callbackUrls.split(',').forEach(function(url) {
    request({
      url: url,
      method: "POST",
      json: {method: method, args: args}
    });
  });
}

module.exports = httpServer;
