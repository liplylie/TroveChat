const Sequelize = require('sequelize');
require('dotenv').config();
require('dotenv').load();

const db = new Sequelize(process.env.DATABASE_URL, {dialect: "postgres"})

db.authenticate()
.then(() => {
  console.log('Successfully Connected to Database');
})
.catch(err => {
  console.log('Error Occur when Connecting to Database');
})

module.exports = db;