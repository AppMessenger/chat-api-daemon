var whatsapp = require('./src/whatsapp.js');

whatsapp.init(process.env.NUMBER, process.env.NICKNAME, process.env.PASSWORD);

whatsapp.EventEmitter.on('whatsapp_event', function(method, args) {
  console.log(method);
  console.log(args);
})
