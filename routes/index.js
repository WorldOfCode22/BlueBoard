const express = require('express');
const path = require('path');

const router = express.Router();
const auth = require('../controllers/AuthController.js');

router.post('/register', auth.doRegister);
router.post('/login', auth.doLogin);
router.post('/logout', auth.logout);

if (process.env.NODE_ENV === 'production') {
  router.use(express.static('client/build'));
  router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}
module.exports = router;
