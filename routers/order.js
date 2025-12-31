const router = require('express').Router();
const createOrder = require('../controllers/orders/create');
const getAllOrders = require('../controllers/orders/getAll');

router.post('/', createOrder);
router.get('/', getAllOrders);

module.exports = router;

