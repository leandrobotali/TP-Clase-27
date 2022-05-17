const express = require('express');
const router = express.Router();

const{ login, logout } = require ('../controllers/login.js')


router.post('/', login);

router.get('/logout', logout);




module.exports = router