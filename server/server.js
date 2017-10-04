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

io.on('connection', (socket) => {
	console.log(socket.id, 'socketid')
	console.log('connected in socket io jijijijojoijoijoij');
	socket.on('chat message', (chat) =>{
		console.log(chat,'chat')
		io.emit('chat message', chat)
	})
})

