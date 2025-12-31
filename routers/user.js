const router = require('express').Router();
const login = require('../controllers/users/login');
const signup = require('../controllers/users/signup');

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
