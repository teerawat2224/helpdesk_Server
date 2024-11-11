const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// สร้างรายงาน
const createReport = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, description, category, imageUrl, location_id } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ตรวจสอบว่า location_id มีอยู่ในฐานข้อมูลหรือไม่
    if (location_id) {
      const location = await prisma.locations.findUnique({
        where: { id: location_id },
      });

      if (!location) {
        return res.status(400).json({ message: 'Location not found' });
      }
    }

    const report = await prisma.reports.create({
      data: {
        user_id: req.user.id,
        title,
        description,
        category,
        imageUrl,
        location_id: location_id || null, // ถ้าไม่มี location_id จะใส่ null
        updated_at: new Date(),
        created_at: new Date()
      },
    });

    res.status(201).json(report);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      message: 'Error creating report',
      error: error.message || error,
    });
  }
};

// ดึงรายงานของผู้ใช้
const getUserReports = async (req, res) => {
    try {
        const reports = await prisma.reports.findMany({
            where: { user_id: req.user.id },
        });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user reports', error });
    }
};

module.exports = { createReport, getUserReports };
