var express  = require('express'),
    socketio = require('socket.io'),
    fs       = require('fs'),
    uinput   = require('../build/Release/uinput.node');



var PORT = 3000;



var log = function(msg) {
  console.log([(new Date()).toISOString().split('T')[1], ' - ', msg].join(''));
};



// setup http/ws server via express/socket.io
var app = express();
var server = app.listen(PORT);
var io = socketio.listen(server);

// serve web dir
app.use('/', express.static(__dirname + '/../web') );

log('serving HTTP/WS server on port ' + PORT + '...');



// 1) open socket
fs.open('/dev/uinput', 'a', function (err, fd) {
  if (err) {
    console.log(err);
    return;
  }

  // 2) init uinput
  uinput.initDevice(fd);
  log('uinput is ready.');

  process.on('exit', function() {
    // 4) deinit uinput and close socket
    uinput.deinitDevice(fd);
    fs.close(fd);
  });

  io.sockets.on('connection', function(socket) {
    socket.on('key', function(data) {
      log('key: ' + JSON.stringify(data));

      // 3) write key event(s)
      uinput.writeEvent(fd, data[0], data[1]);
    });
  });
});
