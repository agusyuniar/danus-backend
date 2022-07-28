const express = require('express');
// const {auth} = require('../helpers/auth');
const {staffController} = require('../controller');


const router = express.Router();

router.post('/login', staffController.login);
router.get('/list', staffController.list);

module.exports = router