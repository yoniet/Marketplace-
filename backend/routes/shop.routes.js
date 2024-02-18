
const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth.controller.js');
const userCtrl = require('../controllers/user.controller.js');
const shopCtrl = require('../controllers/shop.controller.js');



router.route('/api/shops')
    .get(shopCtrl.list);

router.route('/api/shops/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization,
        userCtrl.isSeller, shopCtrl.create)


router.param('userId', userCtrl.userByID)

module.exports = router;