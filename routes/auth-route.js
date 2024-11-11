const express = require('express');
const { register, login, forgetPassword, resetPassword } = require('../controllers/auth-controller');
const {  loginAuthen, registerAuthen } = require('../middlewares/validator');

const router = express.Router();

router.post('/register', registerAuthen,register);
router.post('/login', loginAuthen, login);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;