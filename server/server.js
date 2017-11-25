const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('../db/db');
const addChat = require('../db/model/dataModel').AddChat;
const route = require('../server/router/routes');
const app = express();
const socket = require('socket.io');
const axios = require('axios')


const PORT =  process.env.PORT || 3000;

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
var sellerName;
let sellerHolder;
let flag = false;
let dataMessage;
let sellerFlag = false;

io.on('connection', (socket) => {
	//buyers
	socket.on('subscribe', function(room) {
    console.log('joining room', room.roomID);
  	roomID = room.roomID;
    sellerName = room.sellerName
    console.log(roomID, 'roomID')
    console.log(sellerName, 'sellerName')
    socket.join(roomID);
    // check to see if chat already exists
    axios.post('http://localhost:3000/api/addChat/checkChat', {roomID:roomID})
    .then(chat=>{
    	// if exist, send back chat
    	console.log(chat.data, 'api add chat ')
     

    	//io.emit('stored chat from database', chat)
       if (!flag) {
        for ( var i = 0; i < chat.data.length; i++){
          io.emit('saved messages', chat.data[i])
        }
        flag = true;
      }
    })
    .catch(err=>{
    	// if not, create new chat 
    	console.log(err, 'err from getRequest')
  
    	axios.post('http://localhost:3000/api/addChat/createChat', {
        sentBy: '',
        roomID: roomID,
        buyerID: roomID.split(" ")[0],
        sellerName: sellerName,
        sellerID: roomID.split(" ")[1],
        message: ''0
      })
      .then(data=>{
      	console.log(data, 'data from creating chat')
      })
      .catch(err=>{
      	console.log(err, 'failed creating chat')
      })
    })

    // console.log(savedMessages, 'savedMessages')
    // io.emit('saved messages', savedMessages)
	});

	socket.on('confirm seller', (seller)=>{
		console.log(seller, 'confirm seller')
		sellerHolder = seller;
		
	})
	// sellers
	socket.on('seller name', (sellerName)=>{
		console.log('sellername', sellerName)
		socket.join(sellerName)
		if (sellerName === sellerHolder){
				io.sockets.in(sellerName).emit('private room', roomID)
		}
	})

	socket.on('seller subscribe', function(room) {
    console.log('seller joining room', room);
    io.emit('seller joined', true);
    socket.join(room);
     axios.post('http://localhost:3000/api/addChat/checkChat', {roomID:room})
    .then(chat=>{
      // if exist, send back chat
      console.log(chat.data, 'api add chat ')
     

      //io.emit('stored chat from database', chat)
       if (!sellerFlag) {
        for ( var i = 0; i < chat.data.length; i++){
          io.emit('seller saved messages', chat.data[i])
        }
        sellerFlag = true;
      }
    })
	});


	socket.on('send message', function(data) {
      flag = false;
      sellerFlag = false;
	    console.log('sending room post', data);
      dataMessage = data.message;
      axios.post('http://localhost:3000/api/addChat/createChat', {
        sentBy: data.user,
        roomID: roomID,
        buyerID: roomID.split(" ")[0],
        sellerName: sellerName,
        sellerID: roomID.split(" ")[1],
        message: dataMessage
      })
      .then(data=>{
        console.log(data, 'data from adding chat to database')
      })
      .catch(err=>{
        console.log(err, 'failed creating chat')
      })
	    io.sockets.in(data.room).emit('conversation private post', {
	    		user: data.user,
	        message: data.message,
	    });
	});

	
})

