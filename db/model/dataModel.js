const db = require('../db');
const Sequelize = require('sequelize');
const seed = require('../../seeding/index');
const itemData = require('../../seeding/itemData');
const rentedData = require('../../seeding/rentedData');
const userData = require('../../seeding/userSeedData');


const User = db.define('User', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
})

const Item = db.define('Item', {
  itemname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    validate: {
      isDecimal: true 
    },
    allowNull: false
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tag: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true
  },
}, {
  timestamps: false
})

const Rent_trx = db.define('Rent_trx', { 
  //person selling
  renteeId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  //person renting 
  renterId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
}, {
  timestamps: false
})

User.hasMany(Item, { foreignKey: { name: 'rentee_id' }, onDelete: 'CASCADE' })
Item.belongsTo(User, { foreignKey: { name: 'rentee_id' }, onDelete: 'CASCADE' })

// Item.hasOne(Rent_trx, {foreignKey: {name: 'item_id'}, onDelete: 'CASCADE'})
Item.hasOne(Rent_trx, {foreignKey: {name: 'item_id'}, onDelete:'CASCADE'})
// User.hasOne(Rent_trx, {foreignKey: {name: 'renter_id'}, onDelete:'CASCADE'})
// User.hasOne(Rent_trx, {foreignKey: {name: 'rentee_id'}, onDelete:'CASCADE'})


db.sync();

// // Seeding
// db.sync({force: true})
// .then(() => seed(User, userData, "User"))
// .then(() => seed(Item, itemData, "Item"))
// .then(() => seed(Rent_trx, rentedData, "Rent_trx"))
// .catch(err => {
//     console.log('seeding error in model')
// })

module.exports = {
  User,
  Item,
  Rent_trx
}

