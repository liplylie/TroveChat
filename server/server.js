const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const PORT = 3000;

const app = express()
.use(parser.json())
.use(parser.urlencoded({extended: true}))
.use(morgan('dev'))
.use(express.static(path.resolve(__dirname, '../client/static')))
.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`)
})