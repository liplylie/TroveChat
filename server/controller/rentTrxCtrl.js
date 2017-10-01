const { Rent_trx } = require('../../db/model/dataModel');

module.exports = {
  addTrx: (req, res) => {
    Rent_trx.create({
      renteeId: req.body.renteeId,
      renterId: req.body.renterId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      item_id: req.body.item_id,
    })
    .then((data) => {
      res.status(201).send(data)
    })
    .catch((err) => {
      console.log('trx post err',err)
      res.status(404).send(err)
    });
  }
}
