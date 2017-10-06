const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/db');
require('../db/model/dataModel');
const route = require('../server/router/routes');
const app = express();
const socket = require('socket.io');


const PORT = 3000;

app.use(parser.json())
.use(parser.urlencoded({extended: true}))
.use(morgan('dev'))
.use('/api', route)
.use(express.static(path.resolve(__dirname, '../client/static')))
.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/static', 'index.html'));
})
const server = app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`)
})

const io = socket(server);
var roomID;

io.on('connection', (socket) => {


	socket.on('subscribe', function(room) {
    console.log('joining room', room);
  	roomID = room;
    console.log(roomID, 'roomID')
    io.emit('private room', roomID);
    socket.join(room);
	});

	socket.on('seller subscribe', function(room) {
    console.log('seller joining room', room);
    io.emit('seller joined', true);
    socket.join(room);
	});

	socket.on('send message', function(data) {
	    console.log('sending room post', data);
	    io.sockets.in(data.room).emit('conversation private post', {
	    		user: data.user,
	        message: data.message,
	    });
	});
})

