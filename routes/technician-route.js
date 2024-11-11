const express = require('express');
const technicianController = require('../controllers/repairtechnician-controller');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.get('/reports/assigned', authenticate, technicianController.getAssignedReports);
router.patch('/reports/status', authenticate, technicianController.updateReportStatus);

module.exports = router;