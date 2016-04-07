var request = require('request');
var http = require('http');

var httpServer = {}

httpServer.init = function(port, callbackUrls, EventEmitter) {
  httpServer.EventEmitter = EventEmitter;
  httpServer.callbackUrls = callbackUrls;

  httpServer.server = http.createServer(httpServer.handleRequest);
  httpServer.server.listen(port);

  httpServer.EventEmitter.on('whatsapp_event', httpServer.handleWhatsappEvent);
}

httpServer.handleRequest = function(req, res) {
  var data = '';

  req.on('data', function(chunck) {
    data += chunck.toString();
  })

  req.on('end', function() {
    data = JSON.parse(data);

    httpServer.EventEmitter.emit('send_command', data.method, data.args);

    res.end('Command dispatched');
  })

  //websockets.EventEmitter.emit('send_command', message.method, message.args);
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
