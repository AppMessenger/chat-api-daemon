var spawn = require('child_process').spawn;
var client = spawn('php', ['client.php', process.env.NUMBER, process.env.NICKNAME, process.env.PASSWORD], {cwd: '../client'});

client.stdout.on('data', function (data) {
  try {
    var decoded = data.toString().trim().split('\r\n').map(JSON.parse);
    decoded.forEach(function(e) {
      console.log(e.method)
    });
  } catch (e) {
    console.log(data.toString().trim());
    console.log('Bad controll msg');
  }
});

client.on('close', function (code)  {
  console.log('child process exited');
});
