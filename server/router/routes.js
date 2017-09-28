const router = require('express').Router();
const itemCtrl = require('../controller/itemCtrl');
const userCtrl = require('../controller/userCtrl');

router.route('/')
  .get(itemCtrl.fetchAll)
  .post(itemCtrl.create);

router.route('/user')
  .post(userCtrl.addUser);

router.route('/user/:userEmail')
  .get(userCtrl.getUser);



module.exports = router;