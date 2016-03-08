var events = require('events');
var spawn = require('child_process').spawn;
var client = spawn('php', ['client.php', process.env.NUMBER, process.env.NICKNAME, process.env.PASSWORD], {cwd: '../client'});

var whatsapp = new events.EventEmitter();

client.stdout.on('data', function (data) {
  try {
    data.toString().trim().split('\r\n').map(JSON.parse).forEach(function(e) {
      whatsapp.emit('whatsapp_event', e.method, e.args);
    });

  } catch (e) {
    console.log(data.toString().trim());
    console.log('Bad controll msg');
  }
});

client.on('close', function (code)  {
  console.log('child process exited');
});

whatsapp.on('whatsapp_event', function(method, args) {
  console.log(method);
  console.log(args);
})
