var events = require('events');
var spawn = require('child_process').spawn;

var whatsapp = {};

whatsapp.EventEmitter = new events.EventEmitter();

whatsapp.init = function(number, nickname, password) {
  this.client = spawn('php', ['client.php', number, nickname, password], {cwd: '../client'});

  this.client.stdout.on('data', this.onMessage);
  this.client.on('close', this.onClose);

  this.EventEmitter.on('send_command', this.sendCommand);
}

whatsapp.onMessage = function (data) {
  try {
    data.toString().trim().split('\r\n').map(JSON.parse).forEach(function(e) {
      whatsapp.EventEmitter.emit('whatsapp_event', e.method, e.args);
      whatsapp.EventEmitter.emit(e.method, e.args);
    });

  } catch (e) {
    console.log(data.toString().trim());
    console.log('Bad controll msg');
  }
}

whatsapp.onClose = function (code)  {
  console.log('child process exited');
}

whatsapp.sendCommand = function(method, args) {
  whatsapp.client.stdin.write(JSON.stringify({method: method, args: args}));
}

module.exports = whatsapp;
