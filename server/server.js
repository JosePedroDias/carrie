var express = require('express');
var socketio = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socketio.listen(server);

app.use('/', express.static(__dirname + '/../web') );

var log = function(msg) {
	console.log([(new Date()).toISOString().split('T')[1], ' - ', msg].join(''));
};

io.sockets.on('connection', function(socket) {
	//socket.emit('news', {hello:'world'});

	socket.on('key', function(data) {
		log('key: ' + JSON.stringify(data));
	});
});
