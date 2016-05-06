var whatsapp = require('./src/whatsapp.js');
var websockets = require('./src/websockets.js');
var httpServer = require('./src/httpServer.js');

whatsapp.init(process.env.NUMBER, process.env.NICKNAME, process.env.PASSWORD);

websockets.init(8081, whatsapp.EventEmitter);
httpServer.init(8080, process.env.CALLBACK_URLS, whatsapp.EventEmitter);

whatsapp.EventEmitter.on('whatsapp_event', function(method, args) {
  console.log(method);
  console.log(args);
})
