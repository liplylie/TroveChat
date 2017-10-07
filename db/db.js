const Sequelize = require('sequelize');
require('dotenv').config();
require('dotenv').load();

let jordanSQL = 'postgres://xuvmptqz:kihdiQFu_84xlrZw3al-Jb96Tijm-LWl@elmer.db.elephantsql.com:5432/xuvmptqz'
const db = new Sequelize(jordanSQL, {dialect: "postgres"})

db.authenticate()
.then(() => {
  console.log('Successfully Connected to Database');
})
.catch(err => {
  console.log('Error Occur when Connecting to Database');
})

module.exports = db;