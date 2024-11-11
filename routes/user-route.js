const express = require('express');
const { authenticate } = require('../middlewares/authenticate');
const userController = require('../controllers/user-controller');

const router = express.Router();
router.post('/createReport', authenticate, userController.createReport);
router.get('/getUserReports', authenticate, userController.getUserReports);


module.exports = router;