const router = require('express').Router();
const itemCtrl = require('../controller/itemCtrl');
const userCtrl = require('../controller/userCtrl');
const paymentCtrl = require('../controller/paymentCtrl')


router.route('/')
  .get(itemCtrl.fetchAll)
  .post(itemCtrl.create);

router.route('/user')
  .post(userCtrl.addUser);

router.route('/user/:userEmail')
  .get(userCtrl.getUser);

router.route('/user/owner/:rentee_id')
  .get(userCtrl.getUserById);

router.route('/women/payment')
  .get(paymentCtrl.getMsg)
  .post(paymentCtrl.postCharge)

module.exports = router;