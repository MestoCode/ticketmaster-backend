const router = require('express').Router();
const createOrder = require('../controllers/orders/create');
const getAllOrders = require('../controllers/orders/getAll');
const deleteOrder = require('../controllers/orders/delete');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrder);

module.exports = router;

