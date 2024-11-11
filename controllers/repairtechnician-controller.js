const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ดึงรายงานทั้งหมดที่อยู่ในความรับผิดชอบ
const getAssignedReports = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(400).json({ message: 'User not authenticated' });
    }
    try {
        const reports = await prisma.reports.findMany({
            where: {
                user_id: req.user.id,
            },
            include: {
                responsible: true,
                location: true,
            },
        });
        res.json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
};

// อัปเดตสถานะรายงาน
const updateReportStatus = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(400).json({ message: 'User not authenticated' });
    }
    if (!req.user.role || req.user.role == 'USER') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const { reportId, status } = req.body;
        const updatedReport = await prisma.reports.update({
            where: { id: reportId },
            data: { status },
        });
        res.json(updatedReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating report status', error });
    }
};

module.exports = { getAssignedReports, updateReportStatus };
