const express = require('express');
const router = express.Router();

const{ getRandom} = require ('../controllers/random.js')


router.get('/', getRandom);


module.exports = router