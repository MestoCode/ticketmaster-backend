const router = require('express').Router();
const login = require('../controllers/admin/login');
const signup = require('../controllers/admin/signup');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
