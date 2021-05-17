var express = require('express');
var path = require('path');
var socketio = require('socket.io');
var app = express();

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs');
app.get('/', function(req, res){
	res.render('index');
});

var server = app.listen(3030, function(){
	console.log('its the year 3030')
});
var io = socketio(server, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true,
  }
});
io.sockets.on('connection', (socket) => {
	socket.on('new_user', (data) => {
		io.emit('user_entered', {
            user: data.user,
            timestamp: new Date()
        })
	})
	socket.on('new_comment', (data) => {
        console.log(data, "is new comment");
        io.emit('comment_added', {...data, timestamp: new Date()});
	})
	socket.on('disconnect', (data) => {
        io.emit('user_left', {
            user: "test", 
            timestamp: new Date()
        })
	})

});
