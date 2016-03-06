var spawn = require('child_process').spawn;
var client = spawn('php', ['client.php']);

client.stdout.on('data', function (data) {
  try {
    var decoded = JSON.parse(data.toString().trim().replace(/^\s+|\s+$/g, ''));
    console.log(decoded.method);
  } catch (e) {
    console.log(data.toString().trim().replace(/^\s+|\s+$/g, ''));
    console.log('Bad controll msg');
  }
});

client.on('close', function (code)  {
  console.log('child process exited');
});
