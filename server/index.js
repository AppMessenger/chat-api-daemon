var whatsapp = require('./src/whatsapp.js');
var websockets = require('./src/websockets.js');

whatsapp.init(process.env.NUMBER, process.env.NICKNAME, process.env.PASSWORD);

websockets.init(8080, whatsapp.EventEmitter);

whatsapp.EventEmitter.on('whatsapp_event', function(method, args) {
  console.log(method);
  console.log(args);
})

setTimeout(function() {
  whatsapp.EventEmitter.emit('send_command', 'sendMessage', ['4915253602422', 'hello world']);
}, 5000);
