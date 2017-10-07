const { AddChat } = require('../../db/model/dataModel');

module.exports = {
  checkChat: (req, res) => {
  	console.log(req, 'check chat req')
    AddChat.findAll({
      where: {
        roomID: req.body.roomID
      }
    })
    .then((chat) => {
      res.status(200).send(chat);
    })
    .catch(err => res.status(404).send(err));
  },
  createChat: (req, res) => {
    AddChat.create({
      sentBy: req.body.sentBy,
		  roomID: req.body.roomID,
			buyerID: req.body.buyerID,
      sellerName: req.body.sellerName,
			sellerID: req.body.sellerID,
			message: req.body.message
    })
    .then((data) => {
      res.status(201).send(data)
    })
    .catch((err) => {
      res.status(404).send(err)
    });
  }
}