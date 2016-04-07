var whatsapp = require('./src/whatsapp.js');
var websockets = require('./src/websockets.js');
var httpServer = require('./src/httpServer.js');

whatsapp.init(process.env.NUMBER, process.env.NICKNAME, process.env.PASSWORD);

websockets.init(process.env.WEBSOCKET_PORT, whatsapp.EventEmitter);
httpServer.init(process.env.HTTP_PORT, process.env.CALLBACK_URLS, whatsapp.EventEmitter);

whatsapp.EventEmitter.on('whatsapp_event', function(method, args) {
  console.log(method);
  console.log(args);
})
