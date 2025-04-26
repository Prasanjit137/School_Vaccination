const express = require('express');
const router = express.Router();
const { register, login, home } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', register);
router.post('/login', login);
router.get('/home', authenticateToken, home);

module.exports = router;