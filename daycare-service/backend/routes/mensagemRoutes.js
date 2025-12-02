const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagemController');

router.post('/checkin', mensagemController.checkin);
router.post('/checkout', mensagemController.checkout);
router.post('/status', mensagemController.status);
router.post('/alerta', mensagemController.alerta);

module.exports = router;