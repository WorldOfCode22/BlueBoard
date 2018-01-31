const express = require('express');

const router = express.Router();
const auth = require('../controllers/AuthController.js');

router.post('/register', auth.doRegister);
router.post('/login', auth.doLogin);
router.post('/logout', auth.logout);

router.get('*', (req, res) => res.send({ message: 'Hello' }));

module.exports = router;
