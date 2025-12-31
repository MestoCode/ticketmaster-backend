const router = require('express').Router();
const login = require('../controllers/admin/login');
const signup = require('../controllers/admin/signup');
const getAllOrders = require('../controllers/admin/getAllOrders');

router.post('/login', login);
router.post('/signup', signup);
router.get('/orders', getAllOrders);

module.exports = router;
