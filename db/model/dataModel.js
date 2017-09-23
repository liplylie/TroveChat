const db = require('../db');
const Sequelize = require('sequelize');

const User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sex: {
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
    type: Sequelize.DECIMAL,
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
  renterID: {
    type: Sequelize.INTEGER,
    allowNull: false
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

Rent_trx.belongsTo(Item, {foreignKey: {name: 'item_id'}, onDelete:'CASCADE'})
// User.hasOne(Rent_trx, {foreignKey: {name: 'renter_id'}, onDelete:'CASCADE'})
// User.hasOne(Rent_trx, {foreignKey: {name: 'rentee_id'}, onDelete:'CASCADE'})



db.sync({force: true});

module.exports = {
  User,
  Item,
  Rent_trx
}