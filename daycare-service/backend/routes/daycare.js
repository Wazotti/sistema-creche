const express = require('express');
const router = express.Router();
const daycareController = require('../controllers/daycareController');


// endpoints CRUD simples (em memória)
router.get('/children', daycareController.listChildren);
router.post('/children', daycareController.createChild);
router.put('/children/:id', daycareController.updateChild);
router.delete('/children/:id', daycareController.deleteChild);


module.exports = router;