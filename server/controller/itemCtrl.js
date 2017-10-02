const { Item } = require('../../db/model/dataModel');

module.exports = {
  fetchAll: (req, res) => {
    Item.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
  },
  create: (req, res) => {
    Item.create({
      rentee_id: req.body.rentee_id,
      itemname: req.body.itemname,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      size: req.body.size,
      sex: req.body.sex,
      tag: req.body.tag,
      status: req.body.status
    })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
  },
  getItem: (req, res) => {
    Item.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      console.log('getItem err', err)
    })
  }
  
}