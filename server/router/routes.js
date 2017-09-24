const router = require('express').Router();
const itemCtrl = require('../controller/itemCtrl');

router.get('/', itemCtrl.fetchAll);
router.post('/', itemCtrl.create);

module.exports = router;