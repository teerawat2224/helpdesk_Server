const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller.js');
const adminReportController = require('../controllers/adminreport-controller.js');


// Route สำหรับเคส
router.get('/cases', adminController.getAllCases);
router.post('/cases', adminController.createCase);
router.put('/cases/:id', adminController.updateCase);
router.delete('/cases/:id', adminController.deleteCase);

// Route สำหรับสถานที่
router.get('/locations', adminController.getAllLocations);
router.post('/locations', adminController.createLocation);

// Route สำหรับผู้รับผิดชอบ
router.get('/responsibles', adminController.getAllResponsibles);

// Route สำหรับผู้ใช้งาน
router.get('/users', adminController.getAllUsers);
router.put('/update-role', adminController.updateUserRole);

// Route สำหรับปฏิทิน
router.get('/calendar', adminController.getCalendarEvents);

// Route สำหรับรายงาน
router.get('/reports', adminReportController.getAllReports);
router.delete('/reports/:id', adminReportController.deleteReport);

module.exports = router;

