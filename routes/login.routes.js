const express = require('express');
const router = express.Router();

const{ login, singUp, logout} = require ('../controllers/login.js')


router.post('/', login);

router.post('/singUp', singUp);

router.get('/logout', logout);



module.exports = router