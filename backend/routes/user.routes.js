const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller.js');
const authCtrl = require('../controllers/auth.controller.js');

router.route("/api/users")
    .post(userCtrl.create);

router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)

router.param('userId', userCtrl.userByID);    

module.exports = router;