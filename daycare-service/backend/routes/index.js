const express = require('express');
const router = express.Router();


const auth = require('./auth');
const daycare = require('./daycare');


router.use('/auth', auth);
router.use('/daycare', daycare);


module.exports = router;