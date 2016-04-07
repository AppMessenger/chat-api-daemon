var whatsapp = require('./src/whatsapp.js');
var websockets = require('./src/websockets.js');

whatsapp.init(process.env.NUMBER, process.env.NICKNAME, process.env.PASSWORD);

websockets.init(process.env.WEBSOCKET_PORT, whatsapp.EventEmitter);

whatsapp.EventEmitter.on('whatsapp_event', function(method, args) {
  console.log(method);
  console.log(args);
})
