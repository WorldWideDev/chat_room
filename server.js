var express = require('express');
var path = require('path');
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
var io = require('socket.io').listen(server)

// var users = []
// var userId = 0
// var dicUsers = {}
arrCom = []
var users = {}
io.sockets.on('connection', function (socket){
	console.log('using sockets')

	socket.on('new_user', function (data){
		// console.log(data.users)
		// dicUsers.name = data.users
		// dicUsers.id = userId
		// userId++
		// users.push(dicUsers)
		users[socket.id] = data.user;
		console.log(users)
		console.log(data.user + ' is new user')
		socket.emit('user_added', {loggy: arrCom})
		io.emit('user_entered', {user: users[socket.id]})
	})
	socket.on('new_comment', function (data){
		var commentLog = {}
		thisComment = data.context;
		thisUser = data.user;
		commentLog.user = thisUser;
		commentLog.comment = thisComment;
		arrCom.push(commentLog)
		console.log(arrCom)
		io.emit('comment_added', {comments: commentLog})
	})
	socket.on('disconnect', function (data){
		console.log(users[socket.id])
		io.emit('user_left', {user: users[socket.id]})
	})

});