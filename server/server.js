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

let arrCom = [];
var users = {};
io.sockets.on('connection', (socket) => {
	socket.on('new_user', (data) => {
		// console.log(data.users)
		// dicUsers.name = data.users
		// dicUsers.id = userId
		// userId++
        console.log(data);
		// users.push(dicUsers)
		users[socket.id] = data.user;
		console.log(users)
		console.log(data.user + ' is new user')
		//socket.emit('user_added', {newUser: data.user})
		io.emit('user_entered', {user: users[socket.id]})
	})
	socket.on('new_comment', (data) => {
        console.log(data, "is new comment");
		io.emit('comment_added', data);
	})
	socket.on('disconnect', (data) => {
		console.log(users[socket.id])
		io.emit('user_left', {user: users[socket.id]})
	})

});
